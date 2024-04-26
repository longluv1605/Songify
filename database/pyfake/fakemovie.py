import pandas as pd

def fake_movie(datapath, sqlpath):
    data = pd.read_csv(datapath)
    with open(sqlpath, 'w') as f:
        f.write('INSERT INTO movie (id, title, description, release_year, duration, directors, actors)\nVALUES\n')
        for i in range(data.shape[0]):
            print(i)
            try:
                row = data.iloc[i]
                id = row['id']
                title = row['name'].replace('\'','\\\'').replace('\n','\\n').replace('\r','\\r').replace('\t','\\t')
                description = row['description'].replace('\'','\\\'').replace('\n','\\n').replace('\r','\\r').replace('\t','\\t')
                release_year = int(row['release_year'])
                duration = int(row['duration'].replace(' minutes',''))
                directors = row['directors'].replace('[','').replace(']','').replace('\'','').replace('\"','')
                actors = row['cast'].replace('[','').replace(']','').replace('\'','').replace('\"','')
                
                f.write('\t(' + f'{id}, \'{title}\', \'{description}\', {release_year}, {duration}, \'{directors}\', \'{actors}\'' + ('),\n' if i < data.shape[0]-1 else ');\n'))
            except:
                continue
        f.close()
        
fake_movie('database/pyfake/fakedata/movies.csv', 'database/insert1st/movie.sql')

        
        
