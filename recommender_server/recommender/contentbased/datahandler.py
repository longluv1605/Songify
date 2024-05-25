import pandas as pd
from sklearn.feature_extraction.text import TfidfTransformer


# format new movie in true form
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
        
    # print("<<<<<<<", row)
    return pd.DataFrame([row], columns=cols)


# add new movie to the existing data
def add_new_movie(new_data, old_data_path):
    try:
        # print(new_data)
        old_data = pd.read_csv(old_data_path)
        # print(old_data.head())
        new_data = clean_new_data(new_data)
        data = pd.concat([old_data, new_data], ignore_index=True)
        # print("<><><><>",data)
        data = data.sort_values(by=["Movie ID"])
        data.to_csv(old_data_path, index=False)
    except:
        print("Error in adding new movie")
        return
    
    
# transform movies data to tfidf matrix
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