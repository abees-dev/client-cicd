import { alpha, Box, Stack, styled, SxProps } from '@mui/material';
import { isEmpty } from 'lodash';
import { forwardRef, ReactNode } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { uploadIllustrator } from 'src/assets/images';
import { FileType } from 'src/types';
import { PropsCustoms } from 'src/types/props';
import Image from '../Image';
import MultiplePreview from './MultiplePreview';

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(2, 1),
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: 'transparent',
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

interface IUploadMultiple {
  files?: Partial<FileType[]>;
  sx?: SxProps;
  helpText?: string;
  preview?: ReactNode;
  showPreview?: boolean;
  singlePreview?: boolean;
  onRemove?: (file?: FileType) => void;
}

type UploadMultipleType = IUploadMultiple & PropsCustoms<DropzoneOptions>;

const UploadMultiple = forwardRef(
  ({ files, sx, preview, showPreview, singlePreview, onRemove, ...other }: UploadMultipleType, ref) => {
    // const handleDropMultiFile = useCallback(
    //   (acceptedFiles) => {
    //     setFiles(
    //       acceptedFiles.map((file) =>
    //         Object.assign(file, {
    //           preview: URL.createObjectURL(file),
    //         })
    //       )
    //     );
    //   },
    //   [setFiles]
    // );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      ...other,
    });

    return (
      <Box className="asdddddddddddddddddddddddddddd" sx={{ width: '100%', ...sx }}>
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
          }}
        >
          <input {...getInputProps()} />
          <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }} ref={ref}>
            {singlePreview && isEmpty(files) && (
              <Image
                src={uploadIllustrator.src}
                sx={{
                  width: '50%',
                }}
              />
            )}
          </Stack>
          {/* {singlePreview && !isEmpty(files) && <PreviewSingle files={files} />} */}
        </DropZoneStyle>
        <MultiplePreview files={files as FileType[]} />
      </Box>
    );
  }
);

// interface PreviewSingleProp {
//   files?: Partial<FileType[]>;
// }

// interface MasonryProps {
//   length: number;
// }

// const MasonryStyled = styled(Masonry, {
//   shouldForwardProp: (prop) => prop !== 'length',
// })<MasonryProps>(({ theme, length }) => ({
//   // height: 'calc(100% + 1px)',
//   '& :nth-of-type(3)': {
//     position: 'relative',
//     ...(length > 0 && {
//       '&::before': {
//         content: `'+${length}'`,
//         position: 'absolute',
//         inset: 0,
//         backgroundColor: alpha(theme.palette.grey[600], 0.7),
//         zIndex: theme.zIndex.tooltip,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: theme.typography.h3.fontSize,
//         fontWeight: 600,
//         color: theme.palette.grey[300],
//         borderRadius: theme.shape.borderRadius,
//       },
//     }),
//   },
// }));

// function PreviewSingle({ files = [] }: PreviewSingleProp) {
//   return (
//     <>
//       <MasonryStyled defaultHeight={0} columns={files.length === 1 ? 1 : 2} spacing={1} length={files.length - 4}>
//         {files?.map((file, index) => {
//           if (index > 3) return null;
//           return (
//             <Box key={index}>
//               <Image
//                 src={isEmpty(file) ? '' : file.preview}
//                 sx={{
//                   height: index % 2 === 0 ? 300 : 200,
//                   borderRadius: 1,
//                   overflow: 'hidden',
//                 }}
//               />
//             </Box>
//           );
//         })}
//       </MasonryStyled>
//     </>
//   );
// }

export default UploadMultiple;
