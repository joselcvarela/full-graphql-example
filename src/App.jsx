import React from 'react';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';

const App = () => (
  <main className="product-page">
    <div className="container">
      <Header pageTitle="Full GraphQL Example" />
      <ProductList />
    </div>
  </main>
);

export default App;
