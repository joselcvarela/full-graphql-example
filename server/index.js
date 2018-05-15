const express = require('express');
const { GraphQLServer } = require('graphql-yoga');
const session = require('express-session');
const path = require('path');
const GraphQLSchema = require('./graphql/graphqlSchema');

const server = new GraphQLServer(GraphQLSchema);

server.express.use('/public', express.static(path.join(__dirname, 'public')));

server.express.use(session({
  name: 'qid',
  secret: 'some-random-secret-here',
  resave: true,
  saveUninitialized: true,
}));

const options = {
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  cors: {
    origin: 'http://localhost:8080',
    credentials: true,
  },
};

server.start(options, () => {
  console.log('The server is running on http://localhost:4000');
});
