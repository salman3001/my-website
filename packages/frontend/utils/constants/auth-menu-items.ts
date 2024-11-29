import { routes } from "../routes";

export interface IAuthMenu {
  name: string;
  href?: string;
}

export const AuthMenuItems: IAuthMenu[] = [
  { name: "Account", href: routes.web.account.index() },
];
