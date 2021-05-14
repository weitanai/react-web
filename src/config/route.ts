import { rolesMap } from '@/config/role';

export enum PATH {
  RecorrectAnswerSearch = '/recorrectAnswer/search',
  RecorrectAnswerId = '/recorrectAnswer/:id',
}

const config: Record<string, IRouteConfig> = {
  [PATH.RecorrectAnswerSearch]: {
    roles: rolesMap.all,
  },
  [PATH.RecorrectAnswerId]: {
    roles: rolesMap.all,
  },
};

export default config;

/**
 * 获取指定路径路由配置
 */
export function getRouteConfig(path: string): IRouteConfig {
  const pathStrs = path.split('/');

  let index = pathStrs.length;

  while (index > 0) {
    const nowPath = pathStrs.slice(0, index).join('/');
    const nowConfig = config[nowPath];

    if (nowConfig) {
      return nowConfig;
    } else {
      index -= 1;
    }
  }

  /** 没有配置权限则默认无权限控制 */
  return {
    roles: rolesMap.human,
  };
}

export interface IRouteConfig {
  roles: number[];
  asyncCheck?: () => Promise<boolean>;
}
