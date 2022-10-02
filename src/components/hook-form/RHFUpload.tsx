import { SxProps } from '@mui/material';
import React from 'react';
import { DropzoneOptions } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';
import { PropsCustoms } from 'src/types/props';
import { UploadMultiple } from '../upload';

interface IRHFUploadMultiple {
  name: string;
  showPreview?: boolean;
  sx?: SxProps;
  singlePreview?: boolean;
}

type RHFUploadMultipleType = IRHFUploadMultiple & PropsCustoms<DropzoneOptions>;

export const RHFUploadMultiple = ({ name, showPreview, singlePreview, sx, ...other }: RHFUploadMultipleType) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadMultiple
          {...field}
          files={field.value}
          singlePreview={singlePreview}
          showPreview={showPreview}
          sx={sx}
          {...other}
        />
      )}
    />
  );
};
