import config.import_json as json

client = json.clientVal
data_client = json.dataClient
user_client = json.clientUser

def ValidateName(user):
    
    for key, val in client.items():
        for name in val:
            print(name)
            return user in name
    

    
def databaseProfil(user):
    
    for key,value in user_client.items():
        
        if user == user_client_valid('fajar'):
            return data_client['fajar']
        elif user == name_and_pw_client(value['diyan']['user'], value['diyan']['password']):
            return data_client['diyan']
        elif user == name_and_pw_client(value['kimi']['user'], value['kimi']['password']):
            return data_client['kimi']
        else:
            return 'Username not found'
        
def name_and_pw_client(user,pw):
    
    for key,value in user_client.items():
    
        if user == value['fajar']['user'] and pw == value['fajar']['password']:
            return user == value['fajar']['user'] and pw == value['fajar']['password']
        if user == value['diyan']['user'] and pw == value['diyan']['password']:
            return user == value['diyan']['user'] and pw == value['diyan']['password']
        if user == value['kimi']['user'] and pw == value['kimi']['password']:
            return user == value['kimi']['user'] and pw == value['kimi']['password']
        else:
            return 'Username or Password not found'
        
def user_client_valid(user):
    for key, value in user_client.items():
        if user == value['fajar']['user']:
            return user == value['fajar']['user']
        if user == value['diyan']['user']:
            return user == value['diyan']['user']
        if user == value['kimi']['user']:
            return user == value['kimi']['user']
        else:
            return 'Username or Password not found'