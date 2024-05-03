import pandas as pd
import random

def fake_user_history(movie_path, output_path):
    with open(output_path, 'w') as f:
        movieid = pd.read_csv(movie_path).dropna()['id'].values
        f.write('INSERT INTO user_history (user_id, movie_id)\nVALUES\n')
        
        for i in range(1, 182980):
            n = random.randint(0, 5)
            sample = random.sample(list(movieid), n)
            for j in range(n):
                f.write(f'\t({i}, {sample[j]})' + (',' if (j < n - 1 or i < 182979) else ';') + '\n')
        
        f.close()
        

fake_user_history('database/pyfake/fakedata/2k5data.csv', 'database/insert2nd/user_history.sql')