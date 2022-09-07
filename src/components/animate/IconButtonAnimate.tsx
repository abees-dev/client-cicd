import { IconButton, IconButtonProps } from '@mui/material';
import { Variants, motion } from 'framer-motion';
import { PropsCustoms } from '../../types/PropsTypes';

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

function IconButtonAnimate({ size, children, ...other }: PropsCustoms<IconButtonProps>) {
  const isSmall = size === 'small';
  const isMedium = size === 'medium';
  return (
    <motion.div
      whileHover="hover"
      whileTap="tab"
      variants={(isSmall && variantSmall) || (isMedium && variantMedium) || variantLarge}
    >
      <IconButton size={size} {...other}>
        {children}
      </IconButton>
    </motion.div>
  );
}

export default IconButtonAnimate;
