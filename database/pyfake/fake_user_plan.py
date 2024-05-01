import random
import faker
import datetime

def fake_user_plan(path):
    fake = faker.Faker()
    with open(path, 'w') as f:
        f.write('INSERT INTO user_plan (user_id, plan_id, start_date)\nVALUES\n')
        nuser = 0
        c1, c2, c3, c4 = 0, 0, 0, 0
        while nuser < 182979:
            planid = random.randint(1, 5)
            if planid == 1 and c1 < 46480:
                c1 += 1
            elif planid == 2 and c2 < 45500:
                c2 += 1
            elif planid == 3 and c3 < 45500:
                c3 += 1
            elif planid == 4 and c4 < 45500:
                c4 += 1
            else:
                continue
            nuser += 1
            duration = 30 if planid == 1 else 90 if (planid == 2 or planid == 3) else 180
            start = fake.date_between(start_date=('-' + f'{duration - 1}'+ 'd'), end_date='today')
            f.write('\t(' + f'{nuser}, {planid}, \'{start}\'' + ('),' if nuser < 182979 else ');') + '\n')
            print(nuser)
        f.close()
        
fake_user_plan('database/insert2nd/user_plan.sql')