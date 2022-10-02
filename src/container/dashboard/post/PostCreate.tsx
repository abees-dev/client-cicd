import { alpha, Box, Button, Card, Divider, Stack, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CameraIllustrator, LiveIllustrator, LoveIcon } from 'src/assets';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';
import Dialog from 'src/components/Dialog';
import Iconify from 'src/components/Iconify';
import MyAvatar from 'src/components/MyAvatar';
import { Post } from 'src/generated/graphql';
import PostCreateForm from './PostCreateForm';

const RootStyled = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const InputStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  padding: theme.spacing(1, 2),
  flex: 1,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  minHeight: 48,
  '&:hover': {
    backgroundColor: alpha(theme.palette.divider, 0.3),
  },
}));

export interface PostCreateProps {
  open: boolean;
  handleSuccess: (post: Post) => void;
  handleOpen: () => void;
  handleClose: () => void;
}

export default function PostCreate({ open, handleSuccess, handleClose, handleOpen }: PostCreateProps) {
  return (
    <RootStyled>
      <Stack direction="row" spacing={2}>
        <MyAvatar />
        <InputStyle onClick={handleOpen}>
          <Typography variant="body2">What are you thinking?</Typography>
        </InputStyle>
      </Stack>
      <Stack direction="row" mt={2}>
        <Button
          variant="text"
          color="inherit"
          fullWidth
          size="large"
          startIcon={<LiveIllustrator sx={{ width: 20, mr: 1 }} />}
        >
          Live stream
        </Button>
        <Button
          variant="text"
          color="inherit"
          fullWidth
          size="large"
          onClick={handleOpen}
          startIcon={<CameraIllustrator sx={{ width: 20, mr: 1 }} />}
        >
          photo/video
        </Button>
        <Button
          variant="text"
          color="inherit"
          fullWidth
          size="large"
          startIcon={<LoveIcon sx={{ width: 20, mr: 1 }} />}
        >
          feeling
        </Button>
      </Stack>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <Box py={2}>
          <Box position="relative">
            <Typography variant="h5" align="center" mb={2}>
              Create Post
            </Typography>
            <IconButtonAnimate
              sx={{
                position: 'absolute',
                right: 10,
                top: -5,
              }}
              onClick={handleClose}
            >
              <Iconify icon="gg:close" />
            </IconButtonAnimate>
          </Box>
          <Divider />
          <PostCreateForm handleSuccess={handleSuccess} />
        </Box>
      </Dialog>
    </RootStyled>
  );
}
