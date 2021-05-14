import React, { useState, useCallback, useEffect } from 'react';
import { Menu } from 'antd';
import { useModel, Link, useLocation } from 'umi';
import menu from '@/config/menus';
import isArray from 'lodash/isArray';
import intersection from 'lodash/intersection';
import { StyledMenu, StyledMenuItem, StyleSider } from './index.styles';
import { IMenu } from '../../../config/menus';
import uniq from 'lodash/uniq';

const { SubMenu } = Menu;

/** eg: /a/b/c，提取/a */
const getFirPath = (path: string) => {
  const _path = path.split('/').filter((item) => item)[0];

  return _path ? `/${_path}` : path;
};

const Sider: React.FC = () => {

  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectKeys, setSelectKeys] = useState<string[]>([]);

  const handleOpenChange = useCallback((keys: React.ReactText[]) => {
    setOpenKeys(keys.map((key) => String(key)));
  }, []);

  /** 设置当前选中的menu */
  useEffect(() => {
    const pathStrs = location.pathname.split('/').filter((path) => path);
    const _selectKeys = pathStrs.map((path) => `/${path}`);

    setSelectKeys([..._selectKeys, _selectKeys.join('')]);
  }, [location]);

  /** 寻找需要开启的子memu */
  useEffect(() => {
    const _openKeys: string[] = [];

    /** 递归查找匹配的path */
    const recursion = (argMenu: IMenu[], parentMenu?: IMenu) => {
      argMenu.forEach((item) => {
        if (selectKeys.indexOf(item.path) !== -1 && parentMenu) {
          _openKeys.push(parentMenu.path);
        } else if (isArray(item.menus)) {
          recursion(item.menus, item);
        }
      });
    };

    recursion(menu);
    setOpenKeys((old) => uniq([...old, ..._openKeys]));
  }, [selectKeys]);

  return (
    <StyleSider collapsible breakpoint="md" theme="light" collapsedWidth={48}>
      <StyledMenu
        theme="light"
        mode="inline"
        selectedKeys={selectKeys}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
      >
        {menu.map((item) => {
       

          if (isArray(item.menus)) {
            return (
              <SubMenu key={item.path} icon={item.icon} title={item.name}>
                {item.menus.map((subitem) =>
                    <StyledMenuItem key={getFirPath(subitem.path)}>
                      <Link to={subitem.path}>{subitem.name}</Link>
                    </StyledMenuItem>
                )}
              </SubMenu>
            );
          }

          return (
            <StyledMenuItem key={getFirPath(item.path)} icon={item.icon}>
              <Link to={item.path}>{item.name}</Link>
            </StyledMenuItem>
          );
        })}
      </StyledMenu>
    </StyleSider>
  );
};

export default React.memo(Sider);
