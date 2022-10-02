import { Skeleton, Stack, StackProps } from '@mui/material';
import React, { forwardRef } from 'react';

const FriendSkeleton = forwardRef(({ ...other }: StackProps, ref) => {
  return (
    <Stack spacing={1} alignItems="center" ref={ref} {...other}>
      <Skeleton variant="rounded" width="100%" height={120} />
      <Skeleton width="100%" />
      <Skeleton width="100%" />
      <Skeleton variant="rounded" width="100%" height={32} />
      <Skeleton variant="rounded" width="100%" height={32} />
    </Stack>
  );
});

export default FriendSkeleton;
