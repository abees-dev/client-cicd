import { alpha, Box, Stack, styled, SxProps } from '@mui/material';
import React from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { FileType } from 'src/types';
import { PropsCustoms } from 'src/types/props';
import Image from '../Image';
import { isEmpty, isString } from 'lodash';
import { uploadIllustrator } from 'src/assets/images';

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  // padding: theme.spacing(5, 1),
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.paper,

  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

interface IUploadSingle {
  file?: Partial<FileType>;
  sx?: SxProps;
  helpText?: string;
}

type UploadSingleType = IUploadSingle & PropsCustoms<DropzoneOptions>;

export default function UploadSingle({ file, sx, ...other }: UploadSingleType) {
  // const onDrop = useCallback((acceptedFiles: FileType[]) => {
  //   const file = acceptedFiles[0];

  //   // console.log(
  //   //   Object.assign(file, {
  //   //     preview: URL.createObjectURL(file),
  //   //   })
  //   // );
  //   //dependencies
  // }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    ...other,
  });

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
        }}
      >
        <input {...getInputProps()} />

        {!isEmpty(file) ? (
          <Image
            src={isString(file) ? file : file.preview}
            sx={{
              top: 8,
              left: 8,
              borderRadius: 1,
              position: 'absolute',
              width: 'calc(100% - 16px)',
              height: 'calc(100% - 16px)',
            }}
          />
        ) : (
          <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
            <Image
              src={uploadIllustrator.src}
              sx={{
                width: '30%',
              }}
            />
          </Stack>
        )}
      </DropZoneStyle>
    </Box>
  );
}
