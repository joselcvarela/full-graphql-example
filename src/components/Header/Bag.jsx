import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import BagIcon from '../Icons/BagIcon';
import { PRODUCT_FIELDS } from '../ProductItem/ProductItem';

const BAG_QUERY = gql`
  query {
    bag {
      ${PRODUCT_FIELDS}
    }
  }
`;

const BAG_SUBSCRIPTION = gql`
  subscription {
    bag {
      ${PRODUCT_FIELDS}
    }
  }
`;

const Bag = () => (
  <Query
    query={BAG_QUERY}
  >
    {({
      loading,
      error,
      data,
      subscribeToMore,
    }) => {
      subscribeToMore({
        document: BAG_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return subscriptionData.data;
        },
      });
      if (loading) return <p>Loading bag!</p>;
      if (error) return <p>Problem fetching bag!</p>;
      const bagPrice = data.bag.reduce((acc, product) => acc + parseFloat(product.price), 0);

      return (
        <div className="bag">
          <div className="price">{`£${bagPrice}`}</div>
          <BagIcon />
          <span className="count">{data.bag.length}</span>
        </div>
      );
    }}
  </Query>
);


export default Bag;
