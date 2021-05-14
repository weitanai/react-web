declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare module '@@/core/routes' {
  export const getRoutes: () => IUmiRouteConfig[];
}

interface IUmiRouteConfig {
  path: string;
  component: any;
  exact: boolean;
  title?: string;
  roles?: number[];
  asyncCheck?: () => Promise<boolean>;
  routes?: IUmiRouteConfig[];
}
