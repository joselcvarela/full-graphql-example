import React from 'react';
import PropTypes from 'prop-types';
import ArrowLeft from '../Icons/ArrowLeft';
import ArrowRight from '../Icons/ArrowRight';

const PaginationLink = ({ page, selected, onClick }) => (
  <li className="item">
    <a
      href="#"
      className={`link ${selected ? 'active' : ''}`}
      onClick={onClick}
    >
      {page}
    </a>
  </li>
);

PaginationLink.defaultProps = {
  selected: false,
  onClick: null,
};

PaginationLink.propTypes = {
  page: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

const Pagination = ({
  onNext,
  onPrevious,
  onGoToPage,
  totalPages,
  currentPage,
}) => {
  let min = currentPage - 2;
  min = min > 0 ? min : 0;
  let max = currentPage + 2;
  max = max < totalPages ? max : totalPages;
  return (
    <nav className="pagination">
      <ul className="list">
        <li className="item">
          <a
            href="#"
            className="link"
            onClick={onPrevious}
          >
            <ArrowLeft />
          </a>
        </li>
        {
          Array(totalPages).fill(1).slice(min, max).map((_, index) => {
            const page = min + index;
            return (
              <PaginationLink
                key={page}
                onClick={() => currentPage !== page && onGoToPage(page)}
                page={page}
                selected={currentPage === page}
              />
            );
          })
        }
        <li className="item">
          <a
            href="#"
            className="link"
            onClick={onNext}
          >
            <ArrowRight />
          </a>
        </li>
      </ul >
    </nav >
  );
};

Pagination.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onGoToPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
