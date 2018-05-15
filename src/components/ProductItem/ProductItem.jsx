import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import WishlistIcon from '../Icons/WishlistIcon';

export const PRODUCT_FIELDS = `
  id
  title
  subtitle
  price
  priceDiscounted
  image
  isInWishlist
  isInBag
`;

const MUTATION_ADDTOBAG = gql`
  mutation addToBag($id: String!) {
    addToBag(id: $id) {
      id
      isInBag
    }
  }
`;

const MUTATION_REMOVEFROMBAG = gql`
  mutation removeFromBag($id: String!) {
    removeFromBag(id: $id) {
      id
      isInBag
    }
  }
`;

const MUTATION_ADDTOWISHLIST = gql`
  mutation addToWishlist($id: String!) {
    addToWishlist(id: $id) {
      id
      isInWishlist
    }
  }
`;

const MUTATION_REMOVEFROMWISHLIST = gql`
  mutation removeFromWishlist($id: String!) {
    removeFromWishlist(id: $id) {
      id
      isInWishlist
    }
  }
`;

const ProductItem = ({ product, productListQuery }) => {
  const {
    id,
    title,
    subtitle,
    image,
    price,
    priceDiscounted,
    isInBag,
    isInWishlist,
  } = product;

  const PriceDiscounted = () => (
    <div className="price">
      <span className="price strike">{`€${price}`}</span>
      <span className="price discount">{`€${priceDiscounted}`}</span>
    </div>
  );

  const Price = () => (
    <div className="price">
      <span className="price">{`€${price}`}</span>
    </div>
  );

  const AddToBag = () => (
    <Mutation
      mutation={MUTATION_ADDTOBAG}
    >
      {
        addToBag => (
          <button
            className="add-to-cart"
            onClick={() => addToBag({ variables: { id } })}
          >
            Add to Bag
          </button>
        )
      }
    </Mutation>
  );

  const InBag = () => (
    <Mutation
      mutation={MUTATION_REMOVEFROMBAG}
      update={(cache, { data }) => {
        const productsInBag = data.removeFromBag.map(p => p.id);
        const { products } = cache.readQuery({ ...productListQuery });
        const updatedProducts = products.map(p => Object.assign(
          {},
          p,
          { isInBag: productsInBag.indexOf(p.id) >= 0 },
        ));
        cache.writeQuery({
          ...productListQuery,
          data: { products: updatedProducts },
        });
      }}
    >
      {
        removeFromBag => (
          <button
            className="remove-from-cart"
            onClick={() => removeFromBag({ variables: { id } })}
          >
            Remove from Bag
          </button>
        )
      }
    </Mutation>
  );

  const AddToWishlist = () => (
    <Mutation
      mutation={MUTATION_ADDTOWISHLIST}
    >
      {
        addToWishlist => (
          <button
            className="add-to-wishlist"
            onClick={() => addToWishlist({ variables: { id } })}
          >
            <WishlistIcon />
          </button>
        )
      }
    </Mutation>
  );

  const InWishlist = () => (
    <Mutation
      mutation={MUTATION_REMOVEFROMWISHLIST}
      update={(cache, { data }) => {
        const productsInWishlist = data.removeFromWishlist.map(p => p.id);
        const { products } = cache.readQuery({ ...productListQuery });
        const updatedProducts = products.map(p => Object.assign(
          {},
          p,
          { isInWishlist: productsInWishlist.indexOf(p.id) >= 0 },
        ));
        cache.writeQuery({
          ...productListQuery,
          data: { products: updatedProducts },
        });
      }}
    >
      {
        removeFromWishlist => (
          <button
            className="remove-from-wishlist"
            onClick={() => removeFromWishlist({ variables: { id } })}
          >
            <WishlistIcon />
          </button>
        )
      }
    </Mutation>
  );

  return (
    <li className="product item">
      <article>
        <figure className="image-container">
          <img className="image" src={`/public/${image}`} />
          { isInWishlist ? <InWishlist /> : <AddToWishlist /> }
        </figure>
        <div className="detailes">
          <h1 className="title">{title}</h1>
          <p className="subtitle">{subtitle}</p>
          {priceDiscounted ?
            <PriceDiscounted price={price} priceDiscounted={priceDiscounted} /> :
            <Price price={price} />
          }
          {
            isInBag ? <InBag /> : <AddToBag />
          }
        </div>
      </article>
    </li>
  );
};

export const productPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  priceDiscounted: PropTypes.string,
  isInBag: PropTypes.bool,
  isInWishlist: PropTypes.bool,
});

ProductItem.propTypes = {
  product: productPropType.isRequired,
  productListQuery: PropTypes.shape({
    query: PropTypes.object,
    variables: PropTypes.object,
  }).isRequired,
};

export default ProductItem;
