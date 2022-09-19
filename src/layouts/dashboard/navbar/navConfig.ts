import { PATH_DASHBOARD } from 'src/routes/paths';

export function getActive<T extends string>(path: T, pathname: T, asPath: T) {
  const currentPath = path.split('/').pop() as string;
  const pathnameRouter = pathname.split('/').pop() as string;
  const asPathRouter = asPath.split('/').pop() as string;
  return pathnameRouter.includes(currentPath) || asPathRouter.includes(currentPath);
}

export interface IList {
  title: string;
  path: string;
  icon: string;
  children?: IChildren[];
}

export interface IChildren {
  title: string;
  path: string;
  children?: IChildren[];
}

export interface INavBar {
  subheader: string;
  lists: IList[];
}

export const navConfig: INavBar[] = [
  {
    subheader: 'DashBoard',
    lists: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.root,
        icon: 'ci:home-alt-fill',
      },
      {
        title: 'Task',
        path: PATH_DASHBOARD.task,
        icon: 'uim:bag',
      },
      {
        title: 'Notification',
        path: PATH_DASHBOARD.notification,
        icon: 'fa6-solid:bell',
      },
      {
        title: 'Message',
        path: PATH_DASHBOARD.message,
        icon: 'ant-design:message-filled',
      },
      {
        title: 'Inbox',
        path: PATH_DASHBOARD.inbox,
        icon: 'ic:sharp-forward-to-inbox',
      },
    ],
  },
  {
    subheader: 'user',
    lists: [
      {
        title: 'User',
        path: '/user',
        icon: 'ic:round-space-dashboard',
        children: [
          {
            title: 'user',
            path: '/',
          },
        ],
      },
    ],
  },
];
