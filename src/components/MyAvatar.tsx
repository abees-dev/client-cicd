import { Avatar, AvatarProps } from '@mui/material';
import React from 'react';
import { PropsCustoms } from '../types/props';
import createAvatar from '../utils/createAvatar';

export default function MyAvatar({ sx, ...other }: PropsCustoms<AvatarProps>) {
  return (
    <Avatar
      src="https://haycafe.vn/wp-content/uploads/2021/11/A"
      color="primary"
      sx={{
        width: 40,
        height: 40,
        bgcolor: (theme) => createAvatar('abees'),
        ...sx,
      }}
      {...other}
    >
      {createAvatar('abees').name}
    </Avatar>
  );
}
