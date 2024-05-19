import random

def fake_user_purchase(path):
    with open(path, 'w') as f:
        nuser = 0
        purchase_methods = ['Credit Card', 'Paypal', 'Debit Card', 'Bank Transfer']
        while nuser < 20000:
            user_id = random.randint(1, 182979)
            pricing_plan_id = random.randint(2, 4)
            purchase_method = random.choice(purchase_methods)
            f.write('INSERT INTO user_purchase (user_id, pricing_plan_id, purchase_method)\nVALUES ' + f"\t({user_id}, {pricing_plan_id}, '{purchase_method}');\n")
            nuser += 1
            print(nuser)
        f.close()
        
fake_user_purchase('database/insert2nd/user_purchase.sql')