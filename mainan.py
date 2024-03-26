import assets.import_json as json

dataClient = json.clientUser

for keys, value in dataClient.items():
    namec = value['user']
    pwc = value['password']
    
    print(namec, pwc)
