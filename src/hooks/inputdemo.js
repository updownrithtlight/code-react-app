import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500); // 防抖 500ms

  React.useEffect(() => {
    if (debouncedQuery) {
      console.log('Search API called with:', debouncedQuery);
      // 调用搜索 API
    }
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default SearchInput;
