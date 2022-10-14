import { Box, Divider, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import React, { MouseEvent, useState } from 'react';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';
import MyAvatar from 'src/components/MyAvatar';
import Popover from 'src/components/Popover';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { PATH_DASHBOARD } from 'src/routes/paths';
import NextLink from 'next/link';
import { useLogout } from 'src/redux/slice/auth.slice';

export default function AccountPopover() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const user = useAppSelector((state) => state.auth.user);

  const handleOpenPopover = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(useLogout());
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const linkTo = PATH_DASHBOARD.profile(user?.id as string);

  return (
    <div>
      <IconButtonAnimate
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        onClick={handleOpenPopover}
      >
        <MyAvatar />
      </IconButtonAnimate>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        width={240}
        sx={{ maxHeight: 400 }}
      >
        <List disablePadding>
          <Box p={1}>
            <NextLink href={linkTo} passHref>
              <ListItemButton dense sx={{ borderRadius: 1 }}>
                <ListItemText primary={<Typography variant="body2">Profile</Typography>} />
              </ListItemButton>
            </NextLink>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box p={1}>
            <ListItemButton dense sx={{ borderRadius: 1 }} onClick={handleLogout}>
              <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
            </ListItemButton>
          </Box>
        </List>
      </Popover>
    </div>
  );
}
