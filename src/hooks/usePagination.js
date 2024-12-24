import { useState, useEffect } from 'react';

const usePagination = (fetchData, initialPageSize = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateData = async () => {
    setLoading(true);
    try {
      const { items, total } = await fetchData(currentPage, pageSize);
      setData(items);
      setTotalItems(total);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateData();
  }, [currentPage, pageSize]);

  return {
    data,
    loading,
    currentPage,
    pageSize,
    totalItems,
    setPageSize,
    setCurrentPage,
  };
};

export default usePagination;
