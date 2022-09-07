import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IRHFTextField {
  name: string;
}

export default function RHFTextField({ name, ...other }: IRHFTextField & TextFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} helperText={error && error.message} error={!!error} {...other} />
      )}
    />
  );
}
