import { Container } from '@mui/material';
import React, { ReactElement } from 'react';
import { ProfileTabs, ProfileThumbnail } from 'src/container/dashboard/profile';
import Layout from 'src/layouts';
import { NextPageWithLayout } from 'src/types';

const Profile: NextPageWithLayout = () => {
  return (
    <Container maxWidth="lg">
      <ProfileThumbnail />
      <ProfileTabs />
    </Container>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Profile;
