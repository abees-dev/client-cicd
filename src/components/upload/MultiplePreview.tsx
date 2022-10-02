// import { List, ListItem, ListProps, styled } from '@mui/material';
// import { isEmpty } from 'lodash';
// import { FileType } from 'src/types';
// import { PropsCustoms } from 'src/types/props';
// import IconButtonAnimate from '../animate/IconButtonAnimate';
// import Iconify from '../Iconify';
// import Image from '../Image';

// const ListItemStyled = styled(ListItem)(({ theme }) => ({
//   padding: 0,
//   width: 120,
//   border: `1px solid ${theme.palette.divider}`,
//   borderRadius: theme.shape.borderRadius,
//   display: 'inline-flex',
//   marginRight: theme.spacing(1),
//   marginTop: theme.spacing(1),
//   position: 'relative',
//   overflow: 'hidden',
// }));

// interface IMultiplePreview {
//   files?: Partial<FileType[]>;
//   onRemove?: (file: FileType) => void;
// }

// type MultiplePreviewType = IMultiplePreview & PropsCustoms<ListProps>;
// export default function MultiplePreview({ files, onRemove, sx, ...other }: MultiplePreviewType) {
//   const hashFiles = !isEmpty(files);
//   return (
//     <List
//       disablePadding
//       {...other}
//       sx={{
//         ...(hashFiles && {
//           my: 2,
//         }),
//         ...sx,
//       }}
//     >
//       {hashFiles &&
//         files?.map((file, index) => (
//           <ListItemStyled key={index}>
//             <Image src={file?.preview} sx={{ width: 120, height: 120 }} ratio="1/1" />
//             <IconButtonAnimate
//               size="small"
//               sx={{ position: 'absolute', top: 2, right: 2 }}
//               onClick={() => file && onRemove && onRemove(file)}
//             >
//               <Iconify icon="ion:close" />
//             </IconButtonAnimate>
//           </ListItemStyled>
//         ))}
//     </List>
//   );
// }

import { Masonry } from '@mui/lab';
import { alpha, Box, CardMedia, styled } from '@mui/material';
import { isEmpty } from 'lodash';
import React from 'react';
import { FileType } from 'src/types';
import Image from '../Image';

interface PreviewImageProps {
  files: Partial<FileType[]>;
}

interface MasonryProps {
  length: number;
}

const MasonryStyled = styled(Masonry, {
  shouldForwardProp: (prop) => prop !== 'length',
})<MasonryProps>(({ theme, length }) => ({
  // height: 'calc(100% + 1px)',
  '& :nth-of-type(3)': {
    position: 'relative',
    ...(length > 0 && {
      '&::before': {
        content: `'+${length}'`,
        position: 'absolute',
        inset: 0,
        backgroundColor: alpha(theme.palette.grey[600], 0.7),
        zIndex: theme.zIndex.tooltip,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: theme.typography.h3.fontSize,
        fontWeight: 600,
        color: theme.palette.grey[300],
        borderRadius: theme.shape.borderRadius,
      },
    }),
  },
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  marginTop: theme.spacing(2),
  maxHeight: theme.breakpoints.values.sm,
  objectFit: 'contain',
  backgroundColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  height: 600,
})) as typeof CardMedia;

export default function PreviewImageMultiple({ files = [] }: PreviewImageProps) {
  const generateColumn = () => {
    const newLength = files.slice(2).length;
    switch (newLength) {
      case 1:
        return 1;
      case 2:
        return 2;
      default:
        return 3;
    }
  };

  console.log(files);

  return (
    <>
      <Masonry defaultHeight={0} columns={files.length === 1 ? 1 : 2} spacing={1}>
        {files?.map((image, index) => {
          if (index > 1) return null;
          return (
            <Box key={index}>
              {image?.type === 'video/mp4' ? (
                <CardMediaStyled
                  component="video"
                  src={image.preview}
                  sx={{ height: index < 2 ? 300 : 600 }}
                  autoPlay
                  controls
                  loop
                  defaultValue={10}
                />
              ) : (
                <Image
                  src={isEmpty(image) ? '' : image.preview}
                  sx={{
                    height: index < 2 ? 300 : 600,
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                />
              )}
            </Box>
          );
        })}
      </Masonry>

      <MasonryStyled defaultHeight={0} columns={generateColumn()} spacing={1} length={files.length - 5}>
        {files?.slice(2).map((image, index) => {
          if (index > 2) return null;
          return (
            <Box key={index}>
              {image?.type === 'video/mp4' ? (
                <CardMediaStyled
                  component="video"
                  src={image.preview}
                  sx={{ height: 200 }}
                  autoPlay
                  controls
                  loop
                  defaultValue={10}
                />
              ) : (
                <Image
                  src={isEmpty(image) ? '' : image.preview}
                  sx={{
                    height: 200,
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                />
              )}
            </Box>
          );
        })}
      </MasonryStyled>
    </>
  );
}
