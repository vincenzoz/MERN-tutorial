const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const fs = require('fs');
const {GraphQLScalarType} = require('graphql');
const {Kind} = require('graphql/language');
const {MongoClient} = require('mongodb');


const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : dateValue;
    },
    parseLiteral(ast) {
        if (ast.kind == Kind.STRING) {
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value;
        }
    },
});

const url = 'mongodb://localhost:27018/issuetracker';
let db;

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
        issueAdd,
    },
    GraphQLDate
};

function setAboutMessage(_, {message}) {
    return aboutMessage = message;
}

function issueAdd(_, {issue}) {
    validateIssue(issue);
    issue.created = new Date();
    issue.id = issuesDB.length + 1;
    if (issue.status == undefined) issue.status = 'New';
    issuesDB.push(issue);
    return issue;
}

async function issueList() {
    const issues = await db.collection('issues').find({}).toArray();
    return issues;
}

async function connectToDb() {
    const client = new MongoClient(url, {useNewUrlParser:true});
    await client.connect();
    console.log('Connected to MongoDB at', url)
    db = client.db();

}

function validateIssue(issue) {
    const errors = [];

    if (issue.title.length < 3) {
        errors.push(`Filed 'title' must be at least 3 characters long.`)
    }
    if (issue.status == 'Assigned' && !issue.owner) {
        errors.push(`Field 'owner' is required when status is 'Assigned'.`)
    }
    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', { errors });
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
      console.log(error);  
      return error;
    },
});

const app = express();

app.use(express.static("public"));

server.applyMiddleware({app, path:'/graphql'});


(async function () {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
