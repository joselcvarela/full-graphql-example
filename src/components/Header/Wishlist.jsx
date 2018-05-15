import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import WishlistIcon from '../Icons/WishlistIcon';
import { PRODUCT_FIELDS } from '../ProductItem/ProductItem';

const WISHLIST_QUERY = gql`
  query {
    wishlist {
      ${PRODUCT_FIELDS}
    }
  }
`;

const WISHLIST_SUBSCRIPTION = gql`
  subscription {
    wishlist {
      ${PRODUCT_FIELDS}
    }
  }
`;

const Wishlist = () => (
  <Query
    query={WISHLIST_QUERY}
  >
    {({
      loading,
      error,
      data,
      subscribeToMore,
    }) => {
      if (loading) return <p>Loading wishlist!</p>;
      if (error) return <p>Problem fetching wishlist!</p>;
      subscribeToMore({
        document: WISHLIST_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return subscriptionData.data;
        },
      });

      return (
        <div className="wishlist">
          <WishlistIcon />
          <span className="count">{data.wishlist.length}</span>
        </div>
      );
    }}
  </Query>
);


export default Wishlist;
