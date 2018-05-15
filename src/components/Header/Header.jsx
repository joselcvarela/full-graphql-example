import React from 'react';
import PropTypes from 'prop-types';
import Bag from './Bag';
import Wishlist from './Wishlist';

const Header = ({ pageTitle }) => (
  <header className="header">
    <h1 className="title">{pageTitle}</h1>
    <aside className="menu">
      <Bag />
      <Wishlist />
    </aside >
  </header >
);

Header.defaultProps = {
  pageTitle: '',
};

Header.propTypes = {
  pageTitle: PropTypes.string,
};

export default Header;
