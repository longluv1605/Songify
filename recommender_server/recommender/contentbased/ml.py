import mariadb
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.feature_extraction.text import TfidfTransformer


# clean new movie
def clean_new_data(new_data):
    id = new_data[0]
    genres = new_data[1].split(", ")
    cols = [
        "Movie ID",
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "History",
        "Horror",
        "Music",
        "Mystery",
        "Romance",
        "Science Fiction",
        "Thriller",
        "TV Movie",
        "War",
        "Western",
    ]
    row = [0] * 20
    row[0] = id
    for genre in genres:
        index = cols.index(genre)
        row[index] = 1
    return row


# add new movie to the existing data
def add_new_movie(new_data, old_data_path):
    try:
        old_data = pd.read_csv(old_data_path)
        new_data = clean_new_data(new_data)
        data = pd.concat([old_data, new_data])
        data = data.sort_values(by=["Movie ID"])
        data.to_csv(old_data_path, index=False)
    except:
        return


# transform movie_genre data to tfidf matrix
def transform(
    original_data_path, transformed_data_path
):  # original_data_path: movie_genre.csv, transformed_data_path: tfidf_matrix.csv
    orignal_data = pd.read_csv(original_data_path)
    # print(orignal_data.head())
    matrix = orignal_data.iloc[:, 1:].values

    # transform data
    tfidf = TfidfTransformer(smooth_idf=True, norm="l2")
    transformed_data = tfidf.fit_transform(matrix)

    transformed_data = pd.DataFrame(transformed_data.toarray())

    transformed_data["Movie ID"] = orignal_data["Movie ID"]

    transformed_data.to_csv(transformed_data_path, index=False)


# data_path = tfidf_matrix.csv
def prepare(
    feature, label
):  # feature_path: tfidf_matrix.csv, label_path: movie_rating.csv
    # print(feature.head())
    # print(label.head())

    # merge data
    data = pd.merge(feature, label, on="Movie ID", how="inner")
    data = data.drop(["Movie ID", "User ID"], axis=1)
    # print(data.head())

    xtrain = data.iloc[:, :-1].values
    ytrain = data.iloc[:, -1].values
    # print(xtrain, ytrain, sep="\n")

    return xtrain, ytrain


def train_for_one_user(xtrain, ytrain, model):
    # load data
    model.fit(xtrain, ytrain)
    w = model.coef_
    b = model.intercept_
    # print(w, b, sep="\n")
    return w, b


def train(feature_path, label_path, model):
    feature = pd.read_csv(feature_path)
    label = pd.read_csv(label_path)
    W = []
    B = []
    # load data
    i = 0
    for userId in label["User ID"].unique():
        xtrain, ytrain = prepare(feature, label[label["User ID"] == userId])
        w, b = train_for_one_user(xtrain, ytrain, model)
        W.append(w)
        B.append(b)
        # i += 1
        # if i == 1:
        #     break
    return W, B


def predict(user, input, W, B):
    recommendations = {}
    for u, w, b in zip(user, W, B):
        pred = np.dot(input[:, :-1], w) + b
        # print(pred)
        recommendations[u] = np.column_stack((input[:, -1:], pred))
    return recommendations


def insert_into_db(data):
    config = {
        "host": "localhost",
        "user": "root",
        "password": "longluv1605",
        "database": "moflix",
        "port": 2021,  # Port mặc định của MariaDB là 3306
    }

    try:
        # Tạo kết nối
        conn = mariadb.connect(**config)
        print("Kết nối thành công đến MariaDB")

        # Tạo con trỏ để thực hiện truy vấn
        cursor = conn.cursor()

        # Thêm dữ liệu vào bảng
        k = 0
        for userId, movieIds in data.items():
            print(f"userId: {userId}")
            print(f"movieIds: {movieIds}")
            movieIds = movieIds[np.argsort(movieIds[:, 1])][:, 0][-10:][::-1]
            for movieId in movieIds:
                sql = f"""
                    INSERT INTO cbrecommendation (user_id, movie_id)
                    VALUES ({userId}, {int(movieId)})
                """
                # print(sql)
                cursor.execute(sql)
                # print(f"Đã thêm dữ liệu {userId}, {int(movieId)} vào bảng cbrecommendation")
                conn.commit()
            # k += 1
            # if k == 1:
            #     break

    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")

    finally:
        # Đóng kết nối
        if conn:
            conn.close()
            print("Đã đóng kết nối đến MariaDB")


def main():
    W, B = train(
        "recommender_server/recommender/tfidf_matrix.csv",
        "recommender_server/recommender/ratings.csv",
        LinearRegression(),
    )
    input = pd.read_csv("recommender_server/recommender/tfidf_matrix.csv").values
    user = pd.read_csv("recommender_server/recommender/ratings.csv")["User ID"].unique()
    recommendations = predict(user, input, W, B)

    # print(recommendations[1])
    insert_into_db(recommendations)


if __name__ == "__main__":
    main()
