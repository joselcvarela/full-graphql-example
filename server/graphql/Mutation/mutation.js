const { bagChannelName, wishlistChannelName } = require('../Subscription/subscription');
const { getProducts } = require('../Product/product');

const addToBag = (parent, args, { req, pubsub }) => {
  req.session.bag = Object.assign((req.session.bag || {}), {
    [args.id]: 1,
  });
  const productsInBag = getProducts({
    offset: args.offset,
    limit: args.limit,
  }, {
    bag: req.session.bag,
    wishlist: req.session.wishlist,
  }).filter(product => product.isInBag);
  pubsub.publish(bagChannelName, { bag: productsInBag });
  return productsInBag;
};

const removeFromBag = (parent, args, { req, pubsub }) => {
  delete req.session.bag[args.id];
  const productsInBag = getProducts({
    offset: args.offset,
    limit: args.limit,
  }, {
    bag: req.session.bag,
    wishlist: req.session.wishlist,
  }).filter(product => product.isInBag);
  pubsub.publish(bagChannelName, { bag: productsInBag });
  return productsInBag;
};

const addToWishlist = (parent, args, { req, pubsub }) => {
  req.session.wishlist = Object.assign((req.session.wishlist || {}), {
    [args.id]: 1,
  });
  const productsInWishlist = getProducts({
    offset: args.offset,
    limit: args.limit,
  }, {
    bag: req.session.bag,
    wishlist: req.session.wishlist,
  }).filter(product => product.isInWishlist);
  pubsub.publish(wishlistChannelName, { wishlist: productsInWishlist });
  return productsInWishlist;
};

const removeFromWishlist = (parent, args, { req, pubsub }) => {
  delete req.session.wishlist[args.id];
  const productsInWishlist = getProducts({
    offset: args.offset,
    limit: args.limit,
  }, {
    bag: req.session.bag,
    wishlist: req.session.wishlist,
  }).filter(product => product.isInWishlist);
  pubsub.publish(wishlistChannelName, { wishlist: productsInWishlist });
  return productsInWishlist;
};

exports.typeDef = `#graphql
  type Mutation {
    addToBag(id: String!): [Product!]!
    removeFromBag(id: String!): [Product!]!
    addToWishlist(id: String!): [Product!]!
    removeFromWishlist(id: String!): [Product!]!
  }
`;

exports.resolver = {
  Mutation: {
    addToBag,
    removeFromBag,
    addToWishlist,
    removeFromWishlist,
  },
};

exports.addToBag = addToBag;
exports.removeFromBag = removeFromBag;
exports.addToWishlist = addToWishlist;
exports.removeFromWishlist = removeFromWishlist;
