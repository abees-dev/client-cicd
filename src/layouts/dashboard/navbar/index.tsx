import { Box, Divider, Drawer, List, ListSubheader, ListSubheaderProps, styled } from '@mui/material';
import { NAVBAR } from '../../../config';
import useCollapse from '../../../hooks/useCollapse';
import NavbarAccount from './NavbarAccount';
import { navConfig } from './navConfig';
import { NavListRoot } from './NavList';
import NavSwitch from './NavSwitch';

interface IRootProps {
  isCollapse: boolean;
}

export const ListSubheaderStyle = styled((props: ListSubheaderProps) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const RootStyle = styled('div', { shouldForwardProp: (prop) => prop !== 'isCollapse' })<IRootProps>(
  ({ isCollapse, theme }) => ({
    width: !isCollapse ? NAVBAR.NAV_DESKTOP_WIDTH : NAVBAR.NAV_COLLAPSE_WIDTH,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shorter,
    }),
  })
);

export default function Navbar() {
  const { isCollapse, onMouseEnter, onMouseLeave } = useCollapse();

  return (
    <RootStyle isCollapse={isCollapse}>
      <Drawer
        variant="persistent"
        open={true}
        hideBackdrop={true}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        PaperProps={{
          sx: {
            width: !isCollapse ? NAVBAR.NAV_DESKTOP_WIDTH : NAVBAR.NAV_COLLAPSE_WIDTH,
            backgroundColor: (theme) => theme.palette.background.default,
            boxSizing: 'border-box',
            transition: (theme) =>
              theme.transitions.create('all', {
                duration: theme.transitions.duration.shortest,
              }),
          },
        }}
      >
        <NavbarAccount />
        <Divider />
        {navConfig.map((group) => (
          <List key={group.subheader} disablePadding sx={{ px: 2 }}>
            <ListSubheaderStyle
              sx={{
                ...(isCollapse && {
                  opacity: 0,
                }),
              }}
            >
              {group.subheader}
            </ListSubheaderStyle>

            {group.lists.map((list) => (
              <NavListRoot key={list.title} list={list} isCollapse={isCollapse} />
            ))}
          </List>
        ))}
        <NavSwitch />
      </Drawer>
    </RootStyle>
  );
}
