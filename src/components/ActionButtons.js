import React from 'react';
import { Button } from 'antd';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

const ActionButtons = ({ onSync, onBatchGenerate,onBatchGenerateFront }) => (
  <div style={{ marginBottom: 16 }}>
    <Button type="primary" onClick={onSync} icon={<SyncOutlined />}>
      同步数据表
    </Button>
    <Button type="primary" onClick={onBatchGenerate} icon={<PlusOutlined />} style={{ marginLeft: 8 }}>
      批量生成spring代码
    </Button>
    <Button type="primary" onClick={onBatchGenerateFront} icon={<PlusOutlined />} style={{ marginLeft: 8 }}>
      批量生成react代码
    </Button>
  </div>
);

export default ActionButtons;
