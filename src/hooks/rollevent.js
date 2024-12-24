import React, { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

const ScrollComponent = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const debouncedScrollPosition = useDebounce(scrollPosition, 300); // 防抖 300ms

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (debouncedScrollPosition > 500) {
      console.log('User stopped scrolling, loading more content...');
      // 调用加载内容的逻辑
    }
  }, [debouncedScrollPosition]);

  return <div style={{ height: '2000px' }}>Scroll down to see effect</div>;
};

export default ScrollComponent;
