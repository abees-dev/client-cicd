import { Skeleton, Stack, StackProps } from '@mui/material';
import React, { forwardRef } from 'react';

const ProfileHoverSkeleton = forwardRef(({ ...other }: StackProps, ref) => {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={0.5} alignItems="center" ref={ref} {...other}>
        <Skeleton variant="circular" width={40} height={40} />
        <Stack width={60}>
          <Skeleton />
          <Skeleton />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Skeleton variant="rounded" width={80} height={30} />
        <Skeleton variant="rounded" width={80} height={30} />
      </Stack>
    </Stack>
  );
});

export default ProfileHoverSkeleton;
