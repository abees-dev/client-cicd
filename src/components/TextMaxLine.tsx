import { Typography, TypographyProps } from '@mui/material';

// ----------------------------------------------------------------------

interface ITextMaxLine {
  line?: number;
}

type TextMaxLineType = ITextMaxLine & TypographyProps;
const TextMaxLine = ({ variant = 'body1', line = 2, children, sx, ...other }: TextMaxLineType) => {
  return (
    <Typography
      variant={variant}
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: line,
        WebkitBoxOrient: 'vertical',
        ...sx,
      }}
      {...other}
    >
      {children}
    </Typography>
  );
};

export default TextMaxLine;
