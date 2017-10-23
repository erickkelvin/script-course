var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/questao2")
            .then(conn => global.conn = conn)
            .catch(err => console.log(err));

function findAll(callback){  
    global.conn.collection("users").find({}).toArray(callback);
}

function insert(user, callback){
    global.conn.collection("users").insert(user, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.conn.collection("users").find(new ObjectId(id)).toArray(callback);
}

function update(id, user, callback){
    global.conn.collection("users").updateOne({_id:new ObjectId(id)}, user, callback);
}

function deleteOne(id, callback){
    global.conn.collection("users").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne };