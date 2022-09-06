// @mui
import { alpha, styled } from '@mui/material/styles';
import { ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import { NAVBAR } from '../../../config';
// config

// ----------------------------------------------------------------------

type ListItemProp = {
  activeRoot?: boolean;
  activeSub?: boolean;
  subItem?: boolean;
  isCollapse?: boolean;
};

type ListItemTextProp = {
  isCollapse: boolean;
};

export const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) =>
    prop !== 'activeRoot' && prop !== 'activeSub' && prop !== 'subItem' && prop !== 'isCollapse',
})<ListItemProp>(({ activeRoot, activeSub, subItem, isCollapse, theme }) => ({
  ...theme.typography.body2,
  position: 'relative',
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,

  ...(isCollapse && {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing(1.5),
  }),

  // activeRoot
  ...(activeRoot && {
    ...theme.typography.subtitle2,
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }),
  // activeSub
  ...(activeSub && {
    ...theme.typography.subtitle2,
    color: theme.palette.text.primary,
  }),
  // subItem
  ...(subItem && {
    height: NAVBAR.DASHBOARD_ITEM_SUB_HEIGHT,
  }),
}));

export const ListItemTextStyle = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'isCollapse',
})<ListItemTextProp>(({ isCollapse, theme }) => ({
  whiteSpace: 'nowrap',
  transition: theme.transitions.create(['width', 'opacity'], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(isCollapse && {
    width: 0,
    opacity: 0,
  }),
}));

export const ListItemIconStyle = styled(ListItemIcon)({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': { width: 24, height: 24 },
});
