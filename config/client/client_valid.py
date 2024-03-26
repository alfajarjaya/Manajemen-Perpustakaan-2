import config.import_json as json
# from database.client import user as user_client

client = json.clientVal
data_client = json.dataClient
user_client = json.clientUser

def ValidateName(user):
    
    for key, val in client.items():
        return user in val

    
def databaseProfil(user):
    
    if ValidateName(user):
        
        if user == user_client['Alfajjar']['user']:
            return data_client['fajar']
        elif user == user_client['Diyan']['user']:
            return data_client['diyan']
        elif user == user_client['Kimi']['user']:
            return data_client['kimi']
        else:
            return 'Username not found'
        