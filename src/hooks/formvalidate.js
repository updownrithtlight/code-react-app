import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';

const FormValidation = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500); // 防抖 500ms

  React.useEffect(() => {
    if (debouncedValue) {
      console.log('Validating input:', debouncedValue);
      // 调用验证 API
    }
  }, [debouncedValue]);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Enter value"
    />
  );
};

export default FormValidation;
