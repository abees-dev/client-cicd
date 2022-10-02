function paths(path: string, subPath: string) {
  return `${path}/${subPath}`;
}

const ROOT_DASHBOARD = '/dashboard';
const ROOT_AUTH = '/auth';

export const PATH_DASHBOARD = {
  root: ROOT_DASHBOARD,
  task: paths(ROOT_DASHBOARD, 'task'),
  notification: paths(ROOT_DASHBOARD, 'notification'),
  message: paths(ROOT_DASHBOARD, 'message'),
  inbox: paths(ROOT_DASHBOARD, 'inbox'),
  post: paths(ROOT_DASHBOARD, 'post'),
};

export const PATH_AUTH = {
  root: ROOT_AUTH,
  login: paths(ROOT_AUTH, 'login'),
  register: paths(ROOT_AUTH, 'register'),
};
