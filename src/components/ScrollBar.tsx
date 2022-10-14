import { alpha, styled, SxProps } from '@mui/material';
import { ReactNode } from 'react';
import SimpleBarReact from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 8,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}));

interface ScrollBarProp {
  children: ReactNode;
  sx?: SxProps;
}
type ScrollBarType = ScrollBarProp & SimpleBarReact.Props;

const ScrollBar = ({ children, sx, ...other }: ScrollBarType) => {
  return (
    <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
      {children}
    </SimpleBarStyle>
  );
};

export default ScrollBar;
