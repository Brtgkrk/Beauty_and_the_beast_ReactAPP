import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    console.log(`Total pages: ${totalPages}`);
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`page-number ${i === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
            disabled={i === currentPage}
          >
            {i}
          </button>
        );
      }
      

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Poprzednia strona
      </button>
      {renderPageNumbers()}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Następna strona
      </button>
    </div>
  );
};

export default Pagination;