import { Box } from '@mui/material';
import { BoxProps } from '@mui/system';
import { PropsCustoms } from '../types/PropsTypes';

export const Test = ({ ...other }: PropsCustoms<BoxProps>) => {
  return (
    <Box {...other}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" height="100%">
        <image
          width="100%"
          height="100%"
        />
      </svg>
    </Box>
  );
};