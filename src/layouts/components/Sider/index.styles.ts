import styled from 'styled-components';
import { Layout, Menu } from 'antd';

export const StyleSider = styled(Layout.Sider)`
  overflow: hidden auto;
  user-select: none;
  box-sizing: border-box;
  min-width: 48px;

  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border: none;
  }
  .ant-layout-sider-children {
    height: auto;
  }
`;

export const StyledMenu = styled(Menu)`
  &.ant-menu-inline-collapsed {
    width: 48px;
  }
`;

export const StyledMenuItem = styled(Menu.Item)`
  a {
    padding-left: 6px;
  }
  &.ant-menu-item-selected {
    background-color: #f5f5f7 !important;
  }
  &.ant-menu-item-selected::before {
    display: inline-block;
    content: '';
    width: 4px;
    height: 22px;
    background: #1980ff;
    border-radius: 0px 100px 100px 0px;
    margin-right: 11px;
    position: absolute;
    left: 2px;
    top: 50%;
    transform: translate(0, -50%);
  }
  &.ant-menu-item::after {
    display: none !important;
  }
  &.ant-menu-inline-collapsed {
    width: 48px;
  }
`;
