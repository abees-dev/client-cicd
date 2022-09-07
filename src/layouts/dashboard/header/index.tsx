import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { alpha, Badge, styled } from '@mui/material';
import { HEADER, NAVBAR } from '../../../config';
import useCollapse from '../../../hooks/useCollapse';
import { motion, Variant, Variants } from 'framer-motion';
import IconButtonAnimate from '../../../components/animate/IconButtonAnimate';
import Iconify from '../../../components/Iconify';
import MyAvatar from '../../../components/MyAvatar';
import { Stack } from '@mui/system';

interface AppBarProps {
  isCollapse: boolean;
}

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (props) => props !== 'isCollapse',
})<AppBarProps>(({ theme, isCollapse }) => ({
  width: `calc(100% - ${NAVBAR.NAV_COLLAPSE_WIDTH}px)`,
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.shorter,
  }),
  boxShadow: 'none',
  backgroundImage: 'none',
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  height: HEADER.HEADER_DESKTOP_HEIGHT,

  ...(!isCollapse && {
    width: `calc(100% - ${NAVBAR.NAV_DESKTOP_WIDTH}px)`,
  }),
}));

export default function Header() {
  const { isCollapse } = useCollapse();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarStyled position="fixed" isCollapse={isCollapse}>
        <Toolbar sx={{ height: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end" sx={{ width: 1 }}>
            <IconButtonAnimate size="large">
              <Badge badgeContent={1} color="error">
                <Iconify icon="ooui:bell" sx={{ width: 22, height: 22 }} />
              </Badge>
            </IconButtonAnimate>

            <IconButtonAnimate size="large">
              <Iconify icon="fluent:settings-24-filled" sx={{ width: 22, height: 22 }} />
            </IconButtonAnimate>
            <IconButtonAnimate
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <MyAvatar />
            </IconButtonAnimate>
          </Stack>
        </Toolbar>
      </AppBarStyled>
    </Box>
  );
}
