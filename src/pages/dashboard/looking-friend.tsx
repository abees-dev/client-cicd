import { Box, Divider } from '@mui/material';
import React, { ReactElement } from 'react';
import Page from 'src/components/Page';
import { FiendRequest, FriendRecommend, FriendShipWaiting } from 'src/container/dashboard/looking-friend';
import Layout from 'src/layouts';
import { NextPageWithLayout } from 'src/types';

const LookingFriend: NextPageWithLayout = () => {
  return (
    <Page title="Friend">
      <Box>
        <FiendRequest />
        <FriendShipWaiting />
        <FriendRecommend />
      </Box>
    </Page>
  );
};

LookingFriend.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LookingFriend;
