import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ProductItem, { PRODUCT_FIELDS } from '../ProductItem/ProductItem';
import Pagination from '../Pagination/Pagination';

const PRODUCTS_QUERY = gql`
  query products($offset: Int, $limit: Int) {
    products(offset: $offset, limit: $limit) {
      ${PRODUCT_FIELDS}
    }
  }
`;

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
    this.limit = 6;
  }

  goToPage(page) {
    this.setState({ page });
  }

  render() {
    const queryParams = {
      query: PRODUCTS_QUERY,
      variables: {
        offset: this.state.page * this.limit,
        limit: this.limit,
      },
    };

    return (
      <Query
        {...queryParams}
      >
        {({
          loading,
          error,
          data,
        }) => {
          if (loading) return <p>Fetching products...</p>;
          if (error) return <p>Problem in fetching products! Try again.</p>;

          return (
            <div>
              <ul className="product list">
                {
                  data.products.map((product, index) => (
                    <ProductItem
                      productListQuery={queryParams}
                      key={`${product.title}_${index}`}
                      product={product}
                      onAddToCart={this.addProductToCart}
                    />
                  ))
                }
              </ul >
              <Pagination
                onNext={() => this.goToPage(this.state.page + 1)}
                onPrevious={() => this.goToPage(this.state.page - 1)}
                onGoToPage={page => this.goToPage(page)}
                totalPages={10}
                currentPage={this.state.page}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProductList;
