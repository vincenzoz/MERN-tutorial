const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const fs = require('fs');

let aboutMessage = "Issue Tracker  API v1.0";

const resolvers = {
    Query: {
        about: () => aboutMessage,
    },
    Mutation: {
        setAboutMessage,
    },
};

function setAboutMessage(_, {message}) {
    return aboutMessage = message;
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
