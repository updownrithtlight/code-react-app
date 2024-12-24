import React from 'react';
import { Pagination } from 'antd';

const Paginate = ({ currentPage, pageSize, totalItems, onPageChange }) => (
  <Pagination
    current={currentPage}
    pageSize={pageSize}
    total={totalItems}
    onChange={(page, size) => onPageChange({ page, pageSize: size })}
    showSizeChanger
    showQuickJumper
    pageSizeOptions={['5', '10', '20', '50']}
  />
);

export default Paginate;
