/**
 * 权限校验
 */

import React, { useState, useEffect } from 'react';
import { Result } from 'antd';
import { useRouteMatch, useModel } from 'umi';
import getRoutes from '@/lib/utils/getRoutes';

const PrivateRoute: React.FC = ({ children }) => {
  const routes = getRoutes();
  const match = useRouteMatch();
  const route = routes[0].routes!.find((route) => route.path === match.path);
  const [checkStatus, setCheckStatus] = useState(false);
  const userInfo = useModel('@@initialState', (model) => model.initialState?.user);
  const roles: number[] = route?.roles! || [];

 
  useEffect(() => {
    const asyncCheck = route?.asyncCheck || (() => Promise.resolve(false));
    asyncCheck().then(setCheckStatus);
  }, [route]);

    return <>{children}</>;
};

export default PrivateRoute;
