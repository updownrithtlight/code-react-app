import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';



const NoPermissionPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>403</h1>
      <p>Sorry, you do not have permission to access this page.</p>
      <Button type="primary" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </div>
  );
};

export default NoPermissionPage;
