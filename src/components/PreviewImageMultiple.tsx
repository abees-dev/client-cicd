import { Masonry } from '@mui/lab';
import { alpha, Box, CardMedia, styled } from '@mui/material';
import { isEmpty } from 'lodash';
import React from 'react';
import { Image as ImageType } from 'src/generated/graphql';
import Image from './Image';

interface PreviewImageProps {
  listImage: Partial<ImageType[]>;
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

export default function PreviewImageMultiple({ listImage = [] }: PreviewImageProps) {
  const generateColumn = () => {
    const newLength = listImage.slice(2).length;
    switch (newLength) {
      case 1:
        return 1;
      case 2:
        return 2;
      default:
        return 3;
    }
  };

  return (
    <>
      <Masonry defaultHeight={0} columns={listImage.length === 1 ? 1 : 2} spacing={1}>
        {listImage?.map((image, index) => {
          if (index > 1) return null;
          return (
            <Box key={index}>
              {image?.type === 'image*/mp4' ? (
                <CardMediaStyled component="video" src={image.url} controls loop defaultValue={10} />
              ) : (
                <Image
                  src={isEmpty(image) ? '' : image.url}
                  sx={{
                    height: index > 2 ? 300 : 600,
                    borderRadius: 1,
                    overflow: 'hidden',
                    mt: 2,
                  }}
                />
              )}
            </Box>
          );
        })}
      </Masonry>

      <MasonryStyled defaultHeight={0} columns={generateColumn()} spacing={1} length={listImage.length - 5}>
        {listImage?.slice(2).map((image, index) => {
          if (index > 2) return null;
          return (
            <Box key={index}>
              {image?.type === 'image*/mp4' ? (
                <CardMediaStyled component="video" src={image.url} controls loop defaultValue={10} />
              ) : (
                <CardMediaStyled
                  component="img"
                  src={isEmpty(image) ? '' : image.url}
                  sx={{
                    height: index > 2 ? 300 : 600,
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
