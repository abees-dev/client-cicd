import { Box, BoxProps } from '@mui/material';
import React from 'react';

export default function LiveIllustrator({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
      {...other}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264.8217 264.8217">
        <g id="Layer_2" data-name="Layer 2">
          <g id="_ëîé_1" data-name="‘ëîé_1">
            <circle
              cx="132.4108"
              cy="132.4109"
              r="132.4108"
              transform="translate(-54.8464 132.4108) rotate(-45)"
              fill="#fe0055"
            />
            <path
              d="M204.0561,101.125c0-10.0125-11.961-15.42-19.3056-8.6151q-.0876.081-.1744.1638l-23.7138,22.6145c-5.8759,2.4741-9.9-6.7886-9.9,1.8287v30.5877c0,8.6174,4.0243-.6454,9.9,1.8288l23.7138,22.6144q.0868.0828.1744.1639c7.3446,6.805,19.3056,1.3974,19.3056-8.6152Z"
              fill="#fff"
            />
            <path
              d="M90.1614,76.1578h53.7143a29.3959,29.3959,0,0,1,29.3959,29.3959v53.7142a29.396,29.396,0,0,1-29.396,29.396H90.1614A29.3959,29.3959,0,0,1,60.7655,159.268V105.5537A29.3959,29.3959,0,0,1,90.1614,76.1578Z"
              fill="#fff"
            />
          </g>
        </g>
      </svg>
    </Box>
  );
}
