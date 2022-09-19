import { alpha, Button, Stack, styled, Typography } from '@mui/material';
import Iconify from 'src/components/Iconify';
import MyAvatar from 'src/components/MyAvatar';
import useCollapse from 'src/hooks/useCollapse';

type RootProp = {
  isCollapse: boolean;
};
const RootStyled = styled('div')<RootProp>(({ theme, isCollapse }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),

  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(3),
  position: 'relative',
  ...(!isCollapse && {
    paddingLeft: theme.spacing(2),
  }),
  ...(isCollapse && {
    justifyContent: 'center',
  }),
  transition: theme.transitions.create('all', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const AvatarStyled = styled('div')(({ theme }) => ({
  width: 'fit-content',
  padding: theme.spacing(0.8),
  borderRadius: '100%',
  border: `1px solid ${alpha(theme.palette.grey[500], 0.46)}`,
  position: 'relative',
  transition: theme.transitions.create('all', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const StatusStyled = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: 5,
  right: 0,
  width: 10,
  height: 10,
  borderRadius: '100%',
  backgroundColor: theme.palette.success.main,
}));

const ArrowStyled = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  borderTopLeftRadius: '100%',
  borderBottomLeftRadius: '100%',
  minWidth: 40,
  position: 'absolute',
  padding: theme.spacing(0.5),
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  boxShadow: theme.shadows,
}));

export default function NavbarAccount() {
  const { onToggle, isClick, isCollapse } = useCollapse();
  return (
    <RootStyled isCollapse={isCollapse}>
      <AvatarStyled>
        <MyAvatar />
        <StatusStyled />
      </AvatarStyled>
      {!isCollapse && (
        <Stack>
          <Typography variant="subtitle1" sx={{ whiteSpace: 'pre' }}>
            Abees Dev
          </Typography>
          <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[700] }}>
            Manager
          </Typography>
        </Stack>
      )}

      {!isCollapse && (
        <ArrowStyled variant="contained" color="success" size="small" onClick={onToggle}>
          <Iconify
            icon={!isClick ? 'bi:arrow-left-short' : 'bi:arrow-right-short'}
            sx={{
              color: '#fff',
              width: 28,
              height: 28,
            }}
          />
        </ArrowStyled>
      )}
    </RootStyled>
  );
}
