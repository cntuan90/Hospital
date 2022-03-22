export interface IRoute {
  path: string,
  loadComponent: React.ComponentType,
  title: string,
  exact?: boolean,
  hasAppbar?: boolean,
  hasTitle?: boolean,
  subRoutes?: IRoute[]
  hasNotSidebar?: boolean
}

export interface PrivateRouteType extends IRoute { }