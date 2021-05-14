import { getRoutes } from '@@/core/routes';

/**
 * 获取所有页面路由，排除dumi注入的
 * @param forceRoutes 强制使用传递的路由
 */
const _getRoutes = (forceRoutes?: IUmiRouteConfig[]) => {
  const routes = forceRoutes || getRoutes();

  return routes.filter(
    (route) =>
      route.path.indexOf('~demos') === -1 &&
      route.path.indexOf('_demos') === -1 &&
      route.path.indexOf('~docs') === -1,
  );
};

export default _getRoutes;
