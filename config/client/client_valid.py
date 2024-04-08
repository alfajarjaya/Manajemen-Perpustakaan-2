import config.import_json as json

data_client = json.dataClient
user_client = json.clientUser

def databaseProfil(user):
    for key, value in user_client.items():
        if user == value['fajar']['user']:
            return data_client['fajar']
        if user == value['diyan']['user']:
            return data_client['diyan']
        if user == value['kimi']['user']:
            return data_client['kimi']
        if user == value['nabil']['user']:
            return data_client['nabil']
        if user == value['mifta']['user']:
            return data_client['mifta']
        if user == value['sandi']['user']:
            return data_client['sandi']
    return 'Username not found'

def name_and_pw_client(user,pw):
    
    for key,value in user_client.items():
    
        if user == value['fajar']['user'] and pw == value['fajar']['password']:
            return True
        if user == value['diyan']['user'] and pw == value['diyan']['password']:
            return True
        if user == value['kimi']['user'] and pw == value['kimi']['password']:
            return True
        if user == value['nabil']['user'] and pw == value['nabil']['password']:
            return True
        if user == value['sandi']['user'] and pw == value['sandi']['password']:
            return True
        if user == value['mifta']['user'] and pw == value['mifta']['password']:
            return True
        
    return False
        
def user_client_valid(user):
    for key, value in user_client.items():
        if user == value['fajar']['user']:
            return True
        if user == value['diyan']['user']:
            return True
        if user == value['kimi']['user']:
            return True
        if user == value['nabil']['user']:
            return True
        if user == value['sandi']['user']:
            return True
        if user == value['mifta']['user']:
            return True
    return False
