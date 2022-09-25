import { styled, SxProps, TextareaAutosize, TextareaAutosizeProps, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { PropsCustoms } from 'src/types/props';

interface IRHFTextArea {
  name: string;
  sx?: SxProps;
}

type RHFTextAreaType = IRHFTextArea & PropsCustoms<TextareaAutosizeProps>;

const TextAreaStyle = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'transparent',
  color: theme.palette.grey[200],
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.grey[500]}`,
  outline: 'none',
  resize: 'none',
  padding: theme.spacing(0.5, 1),
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body1.fontSize,
}));

export default function RHFTextArea({ name, sx, ...other }: RHFTextAreaType) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <TextAreaStyle sx={sx} {...field} {...other} />
            {!!error && (
              <Typography variant="caption" color="error.main" ml={1}>
                {error?.message}
              </Typography>
            )}
          </>
        );
      }}
    />
  );
}
