const { PubSub } = require('graphql-yoga');
const Product = require('./Product/product');
const Query = require('./Query/query');
const Mutation = require('./Mutation/mutation');
const Subscription = require('./Subscription/subscription');

const typeDefs = [
  Product.typeDef,
  Query.typeDef,
  Mutation.typeDef,
  Subscription.typeDef,
].join('\n');

const resolvers = Object.assign.apply(null, [
  Query.resolver,
  Mutation.resolver,
  Subscription.resolver,
]);

const pubsub = new PubSub();
const context = ({ request }) => ({
  req: request,
  pubsub,
});

module.exports = {
  typeDefs,
  resolvers,
  context,
};
