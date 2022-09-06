import { Avatar, AvatarProps } from '@mui/material';
import React from 'react';
import { PropsCustoms } from '../types/PropsTypes';

export default function MyAvatar({ sx, ...other }: PropsCustoms<AvatarProps>) {
  return (
    <Avatar
      src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"
      sx={{
        width: 40,
        height: 40,
        ...sx,
      }}
      {...other}
    />
  );
}
