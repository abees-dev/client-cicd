import { Skeleton, Stack, StackProps } from '@mui/material';
import { forwardRef } from 'react';

const PostSkeleton = forwardRef(({ ...other }: StackProps, ref) => {
  return (
    <Stack ref={ref} {...other} spacing={1}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Skeleton variant="circular" width={40} height={40} />
        <Stack spacing={-0.5}>
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={120} />
        </Stack>
      </Stack>
      <Skeleton variant="rounded" height={48} />
      <Skeleton variant="rounded" height={300} />
    </Stack>
  );
});

export default PostSkeleton;
