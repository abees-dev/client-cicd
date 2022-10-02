import { Box, Card, Container } from '@mui/material';
import { isEmpty } from 'lodash';
import { ReactElement, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Page from 'src/components/Page';
import PostSkeleton from 'src/components/skeleton/PostSkeleton';
import { CommentList, PostCreate, PostList } from 'src/container/dashboard/post';
import { AllPostResponse, Post, useGetAllPostQuery } from 'src/generated/graphql';
import Layout from 'src/layouts';
import { NextPageWithLayout } from 'src/types';

const Post: NextPageWithLayout = () => {
  const [page, setPage] = useState(0);

  const { data, loading, fetchMore } = useGetAllPostQuery({
    variables: {
      query: {
        page: 0,
        limit: 2,
      },
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
      setPostResponse(data.postsQuery as AllPostResponse);
      setPage(0);
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
    <Page title="Post">
      <Container maxWidth="md">
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
      </Container>
    </Page>
  );
};

Post.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Post;
