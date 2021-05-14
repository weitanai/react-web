import React, { memo } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2369691_umhdnun811s.js',
});

const MyIcon: React.FC<{
  name: string;
  size?: number;
  color?: string;
}> = ({ name, size = 16, color }) => {
  return <Icon type={name} style={{ fontSize: `${size}px`, color }} />;
};

export default memo(MyIcon);
