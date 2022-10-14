import { formatDistanceStrict, formatDistanceToNow } from 'date-fns';

export const fDistanceToNow = (date: string) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
};

export const fDistanceStrict = (date: string) => {
  return formatDistanceStrict(new Date(date) || new Date(), new Date());
};
