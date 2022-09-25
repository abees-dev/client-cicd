import { Box, Card, Container } from '@mui/material';
import { isEmpty } from 'lodash';
import { ReactElement, useEffect, useState } from 'react';
import { CommentList, PostCreate, PostList } from 'src/container/dashboard/post';
import { Post, useGetAllPostQuery } from 'src/generated/graphql';
import Layout from 'src/layouts';
import { NextPageWithLayout } from 'src/types';

const Post: NextPageWithLayout = () => {
  const { data, loading } = useGetAllPostQuery();

  const [posts, setPosts] = useState<Partial<Post[]>>([]);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && !isEmpty(data)) {
      setPosts(data.posts as Post[]);
    }
  }, [loading]);

  const handleSuccess = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      <PostCreate handleSuccess={handleSuccess} open={open} handleClose={handleClose} handleOpen={handleOpen} />
      {posts.map((post) => (
        <Card key={post?.id} sx={{ pb: 2, mt: 2 }}>
          <Box>
            <PostList post={post as Post} />
            <CommentList post={post as Post} />
          </Box>
        </Card>
      ))}
    </Container>
  );
};

Post.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Post;
