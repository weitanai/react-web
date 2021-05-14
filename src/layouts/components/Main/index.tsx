import React from 'react';
import { Layout } from 'antd';
import Sider from '../Sider';
import { StyleLayoutContent } from './index.styles';

const Main: React.FC = ({ children }) => {
  return (
    <Layout>
      <Sider />
      <StyleLayoutContent>{children}</StyleLayoutContent>
    </Layout>
  );
};

export default Main;
