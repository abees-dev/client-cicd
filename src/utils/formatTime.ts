import { formatDistanceToNow } from 'date-fns';

export const fDistanceToNow = (date: number) => {
  return formatDistanceToNow(date, {
    addSuffix: true,
  });
};
