import faker
fake = faker.Faker()

emails = []
login_names = []

def get_fake_login_name(first_name, last_name):
    return (first_name + last_name).replace(' ', '').lower()

def fake_user(path):
    with open(path, 'a') as f:
        f.write('INSERT INTO user (login_name, password, first_name, last_name, email)\nVALUES\n')
        i = 1
        while i <= 204234:
            print(i)
            first_name = fake.first_name()
            last_name = fake.last_name()
            login_name = get_fake_login_name(first_name, last_name)
            email = fake.email()
            if login_name in login_names or email in emails:
                continue
            login_names.append(login_name)
            emails.append(email)
            password = fake.password()
            i += 1
            f.write('\t(' + f'\'{login_name}\', \'{password}\', \'{first_name}\', \'{last_name}\', \'{email}\'' + ('),\n' if i < 204234 else ');\n'))
        f.close()

fake_user('database/insert1st/user.sql')