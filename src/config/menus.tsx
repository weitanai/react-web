import MyIcon from '@/components/MyIcon';
import React from 'react';
import config, { PATH } from './route';

export const menu: IMenu[] = [
  {
    name: '题目改判',
    path: PATH.RecorrectAnswerSearch,
    icon: <MyIcon name="icon-pen" size={15} />,
    role: config[PATH.RecorrectAnswerSearch]?.roles,
  },
];

export default menu;

export interface IMenu {
  path: string;
  name: string;
  role?: number[];
  icon?: React.ReactNode;
  menus?: IMenu[];
}
