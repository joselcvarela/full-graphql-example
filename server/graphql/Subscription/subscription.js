const bagChannelName = Math.random().toString(36).substring(2, 15);
const wishlistChannelName = Math.random().toString(36).substring(2, 15);

const bag = {
  subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator(bagChannelName),
};

const wishlist = {
  subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator(wishlistChannelName),
};

exports.typeDef = `#graphql
  type Subscription {
    bag: [Product!]!
    wishlist: [Product!]!
  }
`;

exports.resolver = {
  Subscription: {
    bag,
    wishlist,
  },
};

exports.bagChannelName = bagChannelName;
exports.wishlistChannelName = wishlistChannelName;

