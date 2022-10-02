import { Box, BoxProps } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { PropsCustoms } from '../../types/props';

const variantSmall: Variants = {
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.95,
  },
};

const variantMedium: Variants = {
  hover: {
    scale: 1.09,
  },
  tap: {
    scale: 0.97,
  },
};

const variantLarge: Variants = {
  hover: {
    scale: 1.08,
  },
  tap: {
    scale: 0.99,
  },
};

const IconAnimate = forwardRef(
  ({ size = 'medium', children, sx, ...other }: { size?: string } & PropsCustoms<BoxProps>, ref) => {
    const isSmall = size === 'small';
    const isMedium = size === 'medium';
    return (
      <Box
        component={motion.div}
        whileHover="hover"
        whileTap="tab"
        sx={{
          cursor: 'pointer',
          ...sx,
        }}
        variants={(isSmall && variantSmall) || (isMedium && variantMedium) || variantLarge}
        {...other}
      >
        <Box ref={ref}>{children}</Box>
      </Box>
    );
  }
);

export default IconAnimate;
