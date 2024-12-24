import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const ResizeComponent = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const debouncedWindowSize = useDebounce(windowSize, 500); // 防抖 500ms

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    console.log('Window resized to:', debouncedWindowSize);
    // 根据窗口大小重新计算布局
  }, [debouncedWindowSize]);

  return (
    <div>
      <p>Current size: {debouncedWindowSize.width} x {debouncedWindowSize.height}</p>
    </div>
  );
};

export default ResizeComponent;
