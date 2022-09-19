import { alpha, Badge, styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Stack } from '@mui/system';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';
import Iconify from 'src/components/Iconify';
import MyAvatar from 'src/components/MyAvatar';
import { HEADER, NAVBAR } from 'src/config';
import useCollapse from 'src/hooks/useCollapse';

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
