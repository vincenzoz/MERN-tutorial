const { MongoClient } = require('mongodb');


const url = 'mongodb://localhost:27018/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
const client = new MongoClient(url, {useNewUrlParser: true});

client.connect(function(err, client) {
    console.log('Connected to mongo DB')
    
    const db = client.db();
    const collection = db.collection('employees')
    const employee = {id:1, name: 'Jhon Williams', age: 30};
    collection.insertOne(employee, function(err, result) {
        console.log('Employee ' + result.insertedId + ' has been added to the collection employees');
        collection.find({_id: result.insertedId})
        .toArray(function(err, docs) {
            console.log('Result of find:\n', docs)
        })
        client.close();
    })
});