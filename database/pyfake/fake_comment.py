import random
import pandas as pd
import faker

def fake_user_plan(path):
    with open(path, 'w') as f:
        fake = faker.Faker()
        movie_id = pd.read_csv('database/pyfake/fakedata/2k5data.csv').dropna()['id'].values
        f.write("INSERT INTO comment (user_id, movie_id, detail)\nVALUES\n")
        n = 250000
        for i in range(n):
            user_id = random.randint(1, 182979)
            post_id = random.choice(movie_id)
            comment = f'comment {i}'
            f.write(f'\t({user_id}, {post_id}, \'{comment}\'' + ('),' if i != n - 1 else ');') + '\n')
            print(i)
        
        f.close()
        
fake_user_plan('database/insert2nd/comment.sql')