import { useState, useEffect } from 'react';
import { getMenuApi } from '../api/MenuService';

/**
 * 自定义 Hook：加载动态菜单
 * @returns {Object} { menuData, loading, error }
 */
const useMenu = () => {
  const [menuData, setMenuData] = useState([]); // 菜单数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenuApi(); // 调用 API 获取菜单数据
        console.log('菜单',data)
        setMenuData(data.data); // 更新菜单数据
      } catch (err) {
        console.error('Failed to load menu:', err);
        setError(err);
      } finally {
        setLoading(false); // 加载完成
      }
    };

    fetchMenu();
  }, []);

  return { menuData, loading, error };
};

export default useMenu;
