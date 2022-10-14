import { Box, Card, Divider, List, ListItem, ListItemIcon, ListItemText, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Iconify from 'src/components/Iconify';
import TextMaxLine from 'src/components/TextMaxLine';
import { AllPostResponse, Post, useGetAllPostQuery } from 'src/generated/graphql';
import { useInView } from 'react-intersection-observer';
import { isEmpty } from 'lodash';
import { CommentList, PostCreate, PostList } from '../post';
import PostSkeleton from 'src/components/skeleton/PostSkeleton';
import { useAppSelector } from 'src/redux/hooks';
import { HEADER } from 'src/config';
import { useRouter } from 'next/router';
import socket from 'src/utils/socket';

const RootStyled = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

interface IntroduceList {
  icon: string;
  title: string;
}
export const ProfilePost = () => {
  const INTRODUCE_LIST: IntroduceList[] = [
    {
      icon: 'el:map-marker',
      title: 'Live at Ho Chi Minh City',
    },
    {
      icon: 'el:map-marker',
      title: 'have 400 friends',
    },
    {
      icon: 'el:map-marker',
      title: 'Manager at Gleichner, Mueller and Tromp',
    },
    {
      icon: 'el:map-marker',
      title: 'Studied at Nikolaus - Leuschke',
    },
  ];

  const [page, setPage] = useState(0);
  const { query } = useRouter();

  const user = useAppSelector((state) => state.auth.user);

  const { data, loading, fetchMore } = useGetAllPostQuery({
    variables: {
      query: {
        page: 0,
        limit: 2,
      },
      userId: !isEmpty(query.id) ? String(query.id) : String(user?.id),
    },
  });

  const [postResponse, setPostResponse] = useState<AllPostResponse>({
    posts: [],
  });

  const { totalPage, posts } = postResponse;

  const [ref, inView] = useInView();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && !isEmpty(data)) {
      const posts = data.postsQuery?.posts;
      setPostResponse(data.postsQuery as AllPostResponse);
      setPage(0);

      socket.emit(
        'POST_ROOM',
        posts?.map((post) => post.id)
      );
    }
  }, [data, loading]);

  useEffect(() => {
    if (inView) {
      (async () => {
        const { data } = await fetchMore({
          variables: {
            query: {
              page: page + 1,
              limit: 2,
            },
          },
        });
        const { posts, ...other } = data.postsQuery;
        setPage((prev) => prev + 1);

        setPostResponse((prev) => ({ ...prev, posts: [...(prev.posts as Post[]), ...(posts as Post[])], ...other }));
      })();
    }
  }, [inView]);

  const handleSuccess = (post: Post) => {
    setTimeout(() => {
      setPostResponse((prev) => ({ ...prev, posts: [post, ...(prev.posts as Post[])] }));
      setOpen(false);
    }, 1000);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <RootStyled>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Card sx={{ p: 2, position: 'sticky', top: HEADER.HEADER_DESKTOP_HEIGHT + 16 }}>
            <Typography variant="h5">Introduce</Typography>
            <Typography variant="caption">{user?.profile?.story}</Typography>
            <Divider sx={{ my: 2 }} />
            <List>
              {INTRODUCE_LIST.map(({ icon, title }, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <Iconify icon={icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <TextMaxLine variant="body2" line={1}>
                        {title}
                      </TextMaxLine>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid xs={8}>
          <PostCreate handleSuccess={handleSuccess} open={open} handleClose={handleClose} handleOpen={handleOpen} />

          {loading
            ? [...Array(2)].map((_, index) => <PostSkeleton key={index} />)
            : posts?.map((post) => (
                <Card key={post?.id} sx={{ pb: 2, mt: 2 }}>
                  <Box>
                    <PostList post={post as Post} />
                    <CommentList post={post as Post} />
                  </Box>
                </Card>
              ))}

          {!loading && Number(page) < Number(totalPage) - 1 && (
            <PostSkeleton
              sx={{
                mt: 2,
              }}
              ref={ref}
            />
          )}
        </Grid>
      </Grid>
    </RootStyled>
  );
};
