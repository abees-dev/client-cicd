import { Button, IconButton, styled } from '@mui/material';
import Iconify from 'src/components/Iconify';
import useSetting from 'src/hooks/useSetting';

type ButtonAnimateProps = {
  isLight: boolean;
};

type RootProps = INavSwitch;

interface INavSwitch {
  isCollapse: boolean;
}

const RootStyled = styled('div', {
  shouldForwardProp: (props) => props !== 'isCollapse',
})<RootProps>(({ theme, isCollapse }) => ({
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  marginBottom: theme.spacing(2),
  marginTop: 'auto',
  display: 'flex',
  justifyContent: 'center',
  ...(!isCollapse && {
    backgroundColor: theme.palette.action.focus,
    height: 48,
    borderRadius: theme.spacing(20),
    padding: theme.spacing(0.5),
    justifyContent: 'space-between',
    gap: 4,
    position: 'relative',
    alignContent: 'center',
  }),
}));
const ButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: 100,
  minWidth: 115,
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: 'transparent',
  },
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const ButtonAnimateStyled = styled(Button, {
  shouldForwardProp: (props) => props !== 'isLight',
})<ButtonAnimateProps>(({ theme, isLight }) => {
  const transformX = isLight ? '3px' : 'calc(100% + 3px)';
  return {
    backgroundColor: '#FFF',
    borderRadius: 100,
    minWidth: 115,
    position: 'absolute',
    top: '50%',
    color: theme.palette.text.secondary,
    transform: `translate(${transformX},-50%)`,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.complex,
    }),
  };
});

const NavSwitch = ({ isCollapse }: INavSwitch) => {
  const { onChange, themeMode } = useSetting();

  const isLight = themeMode === 'light';
  const handleClick = (method: string) => {
    onChange(method);
  };
  return (
    <RootStyled isCollapse={isCollapse}>
      {!isCollapse ? (
        <>
          <ButtonStyled
            size="medium"
            color="inherit"
            startIcon={<Iconify icon="heroicons:sun-solid" sx={{ width: 24, height: 24 }} />}
            sx={{
              ...(isLight && {
                opacity: 0,
              }),
            }}
            onClick={() => handleClick('light')}
          >
            light
          </ButtonStyled>

          <ButtonStyled
            size="medium"
            color="inherit"
            startIcon={<Iconify icon="heroicons:moon-solid" sx={{ width: 24, height: 24 }} />}
            sx={{
              ...(!isLight && {
                opacity: 0,
              }),
            }}
            onClick={() => handleClick('dark')}
          >
            dark
          </ButtonStyled>

          <ButtonAnimateStyled
            variant="contained"
            size="medium"
            color="inherit"
            isLight={isLight}
            startIcon={
              <Iconify icon={isLight ? 'heroicons:sun-solid' : 'heroicons:moon-solid'} sx={{ width: 24, height: 24 }} />
            }
          >
            {isLight ? 'light' : 'dark'}
          </ButtonAnimateStyled>
        </>
      ) : (
        <IconButton>
          <Iconify icon={isLight ? 'heroicons:sun-solid' : 'heroicons:moon-solid'} sx={{ width: 24, height: 24 }} />
        </IconButton>
      )}
    </RootStyled>
  );
};

export default NavSwitch;
