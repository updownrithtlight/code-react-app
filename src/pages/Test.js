import React, { useState, useEffect } from 'react';

import { getFieldDefinitions ,getFieldDefinitionById } from '../api/fielddefinition/FieldDefinition';

const Test = () => {
  const projectId = 11; // 示例项目 ID
  const [fieldDefinitions, setFieldDefinitions] = useState([]);
  const [fieldDefinition, setFieldDefinition] = useState({});

  // **获取字段定义**
  useEffect(() => {
    const fetchData = async () => {
      const data = await getFieldDefinitions();
      
      setFieldDefinitions(data);
      const dataById = await getFieldDefinitionById('3');
      setFieldDefinition(dataById)
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <h2>字段定义测试</h2>
      {/* 显示字段定义数据 */}
      <pre>{JSON.stringify(fieldDefinitions, null, 2)}</pre>
      <pre>{JSON.stringify(fieldDefinition, null, 2)}</pre>

    </div>
  );
};

export default Test;
