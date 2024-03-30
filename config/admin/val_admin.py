import config.import_json as json


def val_user_and_pw_admin(user,pw):
    valAdmin = json.adminUser
    
    for keys, values in valAdmin.items():
        
        if user == values['admin']['user'] and pw == values['admin']['password']:
            return values['admin']['user'] == user and values['admin']['password'] == pw
        elif user == values['admin_2']['user'] and pw == values['admin_2']['password']:
            return values['admin_2']['user'] == user and values['admin_2']['password'] == pw
        elif user == values['admin_3']['user'] and pw == values['admin_3']['password']:
            return values['admin_3']['user'] == user and values['admin_3']['password'] == pw
        else:
            return None
        
def val_user_admin(user):
    valAdmin = json.adminUser
    
    for keys, values in valAdmin.items():
        
        if user == values['admin']['user']:
            return values['admin']['user']
        if user == values['admin_2']['user']:
            return values['admin_2']['user']
        if user == values['admin_3']['user']:
            return values['admin_3']['user']
        else:
            return None