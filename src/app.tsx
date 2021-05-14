import React from 'react';
import { dynamic } from 'umi';
import { auth } from '@/apis';
import { getRouteConfig } from '@/config/route';
import Package from '../package.json';
import getRoutes from './lib/utils/getRoutes';

export const qiankun = {
  // 应用加载之前
  async bootstrap() {
    console.log(`${Package.name} bootstrap`);
  },
  // 应用 render 之前触发
  async mount() {
    console.log(`${Package.name} mount`);
  },
  // 应用卸载之后触发
  async unmount() {
    console.log(`${Package.name} unmount`);
  },
};

/**
 * 需要异步加载全局权限控制组件
 * 避免 routes 配置比插件配置先执行，导致 patchRoutes 失效
 */
const PrivateRoute = dynamic({
  async loader() {
    const res = await import('@/components/PrivateRoute');
    return res.default;
  },
});

function eachRoutes(routes: IUmiRouteConfig[], action: EachActionType) {
  routes?.forEach((route) => {
    try {
      action(route);
    } finally {
      route.routes && eachRoutes(route.routes, action);
    }
  });
}

/**
 * 植入权限路由
 */
export function patchRoutes({ routes }: { routes: IUmiRouteConfig[] }) {
  eachRoutes(getRoutes(routes)?.[0]?.routes!, (route) => {
    const OriginComp = route.component;

    Object.assign(route, {
      ...getRouteConfig((route.path as string) || ''),
      component: ({ children, ...props }: { children: any }) => {
        return (
          <PrivateRoute>
            <OriginComp {...props}>{children}</OriginComp>
          </PrivateRoute>
        );
      },
    });
  });
}

/**
 * 初始化用户数据
 * 注：这里可以增加其它基本数据
 */
export async function getInitialState() {
  const res = await auth.getInfo();
  const { user } = res.data;
  const permissiones: string[] = user?.permission ?? [];
  return {
    user: res.data.user,
    permissiones,
  };
}

type EachActionType = (route: IUmiRouteConfig) => void;
