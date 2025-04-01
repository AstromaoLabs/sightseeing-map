from django.conf import settings

db = settings.MONGO_DB
spotsDB = db["spots"] #collection_name in mySQL or SQL they call it a table

def get_locations():
    return list(spotsDB.find({}, {"_id": 0}))

def create_location(data):  #we'll add validations here
    return spotsDB.insert_one(data).inserted_id

def update_location(name, new_data):
    return spotsDB.update_one({"name": name}, {"$set": new_data}).modified_count

def delete_location(name):
    return spotsDB.delete_one({"name":name}).deleted_count
#we'll try basic CRUD operation first



#usersDB helper not yet done
usersDB = db["users"]

def createUser(data):
    return usersDB.insert_one(data).insert_id

# def updateUser(name, new_data):