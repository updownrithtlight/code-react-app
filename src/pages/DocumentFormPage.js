import React from 'react';
import StepForm from '../components/StepForm/StepForm';
import { useParams } from 'react-router-dom';

const DocumentFormPage = () => {
  const { id } = useParams();

  return (
    <div>
      <StepForm id={id} />
    </div>
  );
};

export default DocumentFormPage;
