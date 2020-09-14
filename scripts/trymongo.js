const { MongoClient } = require('mongodb');


const url = 'mongodb://localhost:27018/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

function testWithCallbacks(callback) {
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
    if (err) {
        console.log('error...')
    }
}



/*
const promise = new Promise((resolve, reject) => { 
    setTimeout(() => { 
        resolve([89, 45, 323]); 
    }, 5000); 
}); 
promise.then(value => console.log(`Got ${value}`))
promise.then("Resolved!")
*/

testWithCallbacks(function(err) {
    if(err) {
       console.log(err);
    }
});
