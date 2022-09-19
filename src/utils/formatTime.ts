import { formatDistance, formatDistanceToNow } from 'date-fns';

export const fDistanceToNow = (date: string) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
};
