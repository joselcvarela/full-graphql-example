const products = require('./products.json');

exports.typeDef = `#graphql
  type Product {
    description: String
    id: String!,
    title: String!,
    subtitle: String,
    price: String!,
    priceDiscounted: String,
    image: String,
    isInBag: Boolean,
    isInWishlist: Boolean
  }
`;

exports.resolver = {

};

exports.getProduct = (id, { bag, wishlist }) => {
  const productsInBag = Object.keys(bag || {});
  const productsInWishlist = Object.keys(wishlist || {});
  const product = products.find(p => p.id === id);
  return {
    ...product,
    isInBag: productsInBag.indexOf(product.id) >= 0,
    isInWishlist: productsInWishlist.indexOf(product.id) >= 0,
  };
};

exports.getProducts = (args, { bag, wishlist }) => {
  const {
    offset = 0,
    limit = undefined,
  } = args;

  const productsInBag = Object.keys(bag || {});
  const productsInWishlist = Object.keys(wishlist || {});

  const lastIndex = limit ? limit + offset : undefined;

  return products
    .slice(offset, lastIndex)
    .map(product => ({
      ...product,
      isInBag: productsInBag.indexOf(product.id) >= 0,
      isInWishlist: productsInWishlist.indexOf(product.id) >= 0,
    }));
};
