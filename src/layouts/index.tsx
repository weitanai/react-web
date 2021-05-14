import React from 'react';
import Main from './components/Main/index';

const BasicLayout: React.FC = ({ children }) => {


  return (
      <Main>{children}</Main>
  );
};

export default BasicLayout;
