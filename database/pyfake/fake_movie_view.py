import random
import pandas as pd

def fake_movie_view(movie_path, output_path):
    with open(output_path, 'w') as f:
        f.write('INSERT INTO movie_view (movie_id, view) VALUES\n')
        movie = pd.read_csv(movie_path)['id'].values
        for i in range(len(movie)):
            view = random.randint(5000, 150000)
            f.write(f'\t({movie[i]}, {view})' + (',\n' if i != len(movie) - 1 else ';\n'))
            print(i, movie[i], view)
        f.close()
        
fake_movie_view('database/pyfake/fakedata/2k5data.csv', 'database/insert2nd/movie_view.sql')
        