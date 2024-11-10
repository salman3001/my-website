import { routes } from "../routes";

export interface IAuthMenu {
  name: string;
  href?: string;
}

export const AuthMenuItems: IAuthMenu[] = [
  { name: "Profile", href: routes.web.profile() },
];
