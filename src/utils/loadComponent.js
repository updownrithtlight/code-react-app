import React, { lazy } from 'react';

/**
 * 动态加载组件
 * @param {string} componentName - 组件名称（对应文件名）
 * @returns {React.LazyExoticComponent} 动态加载的组件
 */
const loadComponent = (componentName) => {
  return lazy(() => import(`../pages/${componentName}`));
};

export default loadComponent;
