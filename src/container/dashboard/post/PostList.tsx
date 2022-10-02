import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CardMedia,
  Divider,
  Stack,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';
import Iconify from 'src/components/Iconify';
import PreviewImageMultiple from 'src/components/PreviewImageMultiple';
import { Post } from 'src/generated/graphql';
import { useAppSelector } from 'src/redux/hooks';
import { fDistanceToNow } from 'src/utils/formatTime';

const RootStyled = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 2),
}));

const HeaderStyled = styled('header')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ContentStyled = styled('section')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const AvatarIconStyled = styled(Avatar)(({ theme }) => ({
  width: 20,
  height: 20,
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const TextStyled = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  '&:hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  marginTop: theme.spacing(2),
  maxHeight: theme.breakpoints.values.sm,
  objectFit: 'contain',
  backgroundColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
})) as typeof CardMedia;

interface PostListProps {
  post: Post;
}

export default function PostList({ post }: PostListProps) {
  const user = useAppSelector((state) => state.auth.user);

  const { avatar, firstName, lastName } = post.user;
  const { image, content, createdAt } = post;
  return (
    <RootStyled>
      <HeaderStyled>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar src={avatar || ''} />
          <Stack>
            <Typography
              variant="subtitle1"
              sx={{ textTransform: 'capitalize' }}
            >{`${firstName} ${lastName}`}</Typography>
            <Stack direction="row" spacing={0.5}>
              <Typography variant="caption">{fDistanceToNow(Number(createdAt))}</Typography>
              <Tooltip title="public" placement="top">
                <Box>
                  <Iconify icon="ic:baseline-public" />
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
        <IconButtonAnimate>
          <Iconify icon="mingcute:more-1-line" />
        </IconButtonAnimate>
      </HeaderStyled>

      <ContentStyled>
        <Typography variant="body1">{content}</Typography>
        {image.length === 1 ? (
          <CardMediaStyled component="img" src={image[0].url} />
        ) : (
          <PreviewImageMultiple listImage={image} />
        )}
      </ContentStyled>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1} mb={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <AvatarGroup spacing={4} max={2} sx={{ '& .MuiAvatar-root': { border: 'none' } }}>
            <AvatarIconStyled sx={{ bgcolor: 'info.main' }}>
              <Iconify icon="fontisto:like" color="common.white" sx={{ width: 12, height: 12 }} />
            </AvatarIconStyled>
            <AvatarIconStyled sx={{ bgcolor: 'error.main' }}>
              <Iconify icon="ci:heart-fill" color="common.white" sx={{ width: 12, height: 12 }} />
            </AvatarIconStyled>
          </AvatarGroup>
          <TextStyled>3,1K</TextStyled>
        </Stack>
        <Stack direction="row" spacing={1}>
          <TextStyled>3,1K Like</TextStyled>
          <TextStyled>100 comments</TextStyled>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1} mb={1}>
        <Button variant="text" color="inherit" fullWidth startIcon={<Iconify icon="uiw:like-o" />}>
          Like
        </Button>
        <Button variant="text" color="inherit" fullWidth startIcon={<Iconify icon="akar-icons:comment" />}>
          comments
        </Button>
        <Button variant="text" color="inherit" fullWidth startIcon={<Iconify icon="icon-park-outline:share-two" />}>
          share
        </Button>
        <Button
          variant="text"
          color="inherit"
          startIcon={<Avatar sx={{ width: 24, height: 24 }} src={user?.avatar ? user.avatar : ''} />}
          endIcon={<Iconify icon="bi:caret-down-fill" sx={{ width: 12, height: 12 }} />}
        />
      </Stack>
      <Divider />
    </RootStyled>
  );
}
