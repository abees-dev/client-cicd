import { Box, IconButton, IconButtonProps } from '@mui/material';
import { Variants, motion } from 'framer-motion';
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

const IconButtonAnimate = forwardRef(({ size, children, sx, ...other }: PropsCustoms<IconButtonProps>, ref) => {
  const isSmall = size === 'small';
  const isMedium = size === 'medium';
  return (
    <Box
      component={motion.div}
      whileHover="hover"
      whileTap="tab"
      sx={sx}
      variants={(isSmall && variantSmall) || (isMedium && variantMedium) || variantLarge}
    >
      <Box ref={ref}>
        <IconButton size={size} {...other}>
          {children}
        </IconButton>
      </Box>
    </Box>
  );
});

export default IconButtonAnimate;
