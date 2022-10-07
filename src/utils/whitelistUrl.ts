export const whiteListUrl = (path: string) => {
  return ['/auth/login', '/auth/register'].includes(path);
};

export const hashOwner = (query: string, userId: string) => {
  return query === userId;
};
