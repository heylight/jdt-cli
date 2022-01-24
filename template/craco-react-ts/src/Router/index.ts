import RouteBox from "./RouteBox";

export interface route {
  path: string;
  component?: JSX.Element | any;
  title: string;
  name: string;
  requireAuth?: boolean;
  children?: route[];
}

export { RouteBox };
