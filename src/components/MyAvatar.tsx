import { Avatar, AvatarProps } from '@mui/material';
import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { PropsCustoms } from '../types/props';
import createAvatar from '../utils/createAvatar';

export default function MyAvatar({ sx, ...other }: PropsCustoms<AvatarProps>) {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Avatar
      src={user?.avatar || ''}
      color="primary"
      sx={{
        width: 40,
        height: 40,
        bgcolor: () => createAvatar('abees'),
        ...sx,
      }}
      {...other}
    >
      {createAvatar('abees').name}
    </Avatar>
  );
}
