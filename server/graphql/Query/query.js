const { getProducts } = require('../Product/product');

const products = (parent, args, { req }) => getProducts({
  offset: args.offset,
  limit: args.limit,
}, {
  bag: req.session.bag,
  wishlist: req.session.wishlist,
});

const bag = (parent, args, { req }) => getProducts({
  offset: args.offset,
  limit: args.limit,
}, {
  bag: req.session.bag,
  wishlist: req.session.wishlist,
}).filter(product => product.isInBag);

const wishlist = (parent, args, { req }) => getProducts({
  offset: args.offset,
  limit: args.limit,
}, {
  bag: req.session.bag,
  wishlist: req.session.wishlist,
}).filter(product => product.isInWishlist);

exports.typeDef = `#graphql
  type Query {
    products(offset: Int, limit: Int): [Product!]
    product(id: ID!): Product
    bag: [Product!]
    wishlist: [Product!]
  }
`;

exports.resolver = {
  Query: {
    products,
    bag,
    wishlist,
  },
};

exports.products = products;
exports.bag = bag;
exports.wishlist = wishlist;

