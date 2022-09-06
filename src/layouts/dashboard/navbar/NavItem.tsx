import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { Box, ListItemText } from '@mui/material';
//
import Iconify from '../../../components/Iconify';
import { IChildren, IList } from './navConfig';
import { ListItemIconStyle, ListItemStyle, ListItemTextStyle } from './styled';
// ----------------------------------------------------------------------

interface INavItemRoot {
  item: IList;
  isCollapse: boolean;
  open?: boolean;
  active: boolean;
  onOpen?: () => void;
}
export function NavItemRoot({ item, isCollapse, open = false, active, onOpen }: INavItemRoot) {
  const { title, path, icon, children } = item;

  const renderContent = (
    <>
      {icon && (
        <ListItemIconStyle>
          <Iconify
            icon={icon}
            sx={{
              ...(active && {
                color: (theme) => theme.palette.primary.main,
              }),
            }}
          />
        </ListItemIconStyle>
      )}
      <ListItemTextStyle disableTypography primary={title} isCollapse={isCollapse} />
      {!isCollapse && <>{children && <ArrowIcon open={open} />}</>}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeRoot={active} isCollapse={isCollapse}>
        {renderContent}
      </ListItemStyle>
    );
  }

  return (
    <NextLink href={path} passHref>
      <ListItemStyle isCollapse={isCollapse} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    </NextLink>
  );
}

// ----------------------------------------------------------------------

interface INavItemSub {
  item: IList | IChildren;
  open?: boolean;
  active: boolean;
  isCollapse?: boolean;
  onOpen?: () => void;
}

export function NavItemSub({ item, open = false, active = false, isCollapse, onOpen }: INavItemSub) {
  const { title, path, children } = item;

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText disableTypography primary={title} />
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }

  return (
    <NextLink href={path} passHref>
      <ListItemStyle activeSub={active} subItem isCollapse={isCollapse}>
        {renderContent}
      </ListItemStyle>
    </NextLink>
  );
}

// ----------------------------------------------------------------------

DotIcon.propTypes = {
  active: PropTypes.bool,
};

export function DotIcon({ active }: { active: boolean }) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  );
}

// ----------------------------------------------------------------------

ArrowIcon.propTypes = {
  open: PropTypes.bool,
};

export function ArrowIcon({ open }: { open: boolean }) {
  return (
    <Iconify
      icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  );
}
