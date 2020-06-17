const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const fs = require('fs');

let aboutMessage = "Issue Tracker  API v1.0";
const issuesDB = [
    {
    id:1, status: 'New', owner: 'Vincenzo', effort: 10,
    created: new Date('2020-06-08'), due: undefined,
    title: 'Display the user name on the home page'
    },
    {
    id:2, status: 'Assigned', owner: 'Mark', effort: 5,
    created: new Date('2020-06-01'), due: new Date('2020-06-05'),
    title: 'Add user nationality'
    }
];


const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList,
    },
    Mutation: {
        setAboutMessage,
    },
};

function setAboutMessage(_, {message}) {
    return aboutMessage = message;
}

function issueList() {
    return issuesDB;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers
});

const app = express();

app.use(express.static("public"));

server.applyMiddleware({app, path:'/graphql'});

const port = 2000;
app.listen(port, ()=> {
    console.log(`The server is listening on port ${port}`);
});

app.get('/hello', (req, res) => {
    res.send("Hello world!!!");
});
