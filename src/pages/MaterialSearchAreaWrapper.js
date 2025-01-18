import React from 'react';
import { useParams } from 'react-router-dom';
import MaterialSearchArea from '../components/MaterialSearchArea'; // 导入 KitForm 组件

const MaterialSearchAreaWrapper = () => {
  const { projectId } = useParams(); // 获取动态参数 projectId

  return (
    <div style={{ padding: '2px' }}>
        {/* 将 projectId 转为数字后传递 */}
      <MaterialSearchArea projectId={parseInt(projectId, 10)} />
    </div>
  );
};

export default MaterialSearchAreaWrapper;
