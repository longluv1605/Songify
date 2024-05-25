import mariadb
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.feature_extraction.text import TfidfTransformer


# data_path = tfidf_matrix.csv
def prepare(
    feature, label
):  # feature_path: tfidf_matrix.csv, label_path: movie_rating.csv
    # print(feature.head())
    # print(label.head())

    # merge data
    data = pd.merge(feature, label, on="Movie ID", how="inner")
    data = data.drop(["Movie ID", "User ID"], axis=1)
    # print(data.shape)
    # print(data.head())

    xtrain = data.iloc[:, :-1].values
    ytrain = data.iloc[:, -1].values
    # print(xtrain, ytrain, sep="\n")

    return xtrain, ytrain


def single_train(xtrain, ytrain, model):
    # load data
    model.fit(xtrain, ytrain)
    w = model.coef_
    b = model.intercept_
    # print(w, b, sep="\n")
    return w, b


def train(feature_path, label_path, model):
    feature = pd.read_csv(feature_path)
    label = pd.read_csv(label_path)
    # print(feature.shape, label.shape)
    W = []
    B = []
    # load data
    i = 0
    for userId in label["User ID"].unique():
        # print(f"userId: {userId}")
        xtrain, ytrain = prepare(feature, label[label["User ID"] == userId])
        # print(xtrain.shape, ytrain.shape)
        w, b = single_train(xtrain, ytrain, model)
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
        # print(pred[0])
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
            # print(f"userId: {userId}")
            # print(f"movieIds: {movieIds}")
            
            sql = f"""
                DELETE FROM cbrecommendation WHERE user_id = {userId}
            """
            cursor.execute(sql)
            
            movieIds = movieIds[np.argsort(movieIds[:, 1])][:, 0][-10:][::-1]
            for movieId in movieIds:
                sql = f"""
                    INSERT INTO cbrecommendation (user_id, movie_id)
                    VALUES ({userId}, {int(movieId)})
                """
                print(sql)
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


def main(data, model=LinearRegression()):
    if (data):
        # print(">>:>:>::::::::",data)
        ratingDF = pd.DataFrame(data).rename(columns={"user_id": "User ID", "movie_id": "Movie ID", "value": "Rating"})
    
        ratingDF = ratingDF.sort_values(by=["User ID", "Movie ID"])
        print(ratingDF)
    
        ratingDF.to_csv("ratings.csv", index=False)
    print("Data loaded successfully")
    W, B = train(
        "tfidf_matrix.csv",
        "ratings.csv",
        model,
    )
    input = pd.read_csv("tfidf_matrix.csv").values
    user = pd.read_csv("ratings.csv")["User ID"].unique()
    recommendations = predict(user, input, W, B)
    # print(recommendations)

    # print(recommendations[1])
    insert_into_db(recommendations)


if __name__ == "__main__":
    main(None)
