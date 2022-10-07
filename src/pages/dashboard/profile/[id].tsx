import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { ProfileTabs, ProfileThumbnail } from 'src/container/dashboard/profile';
import { useGetCurrentUserLazyQuery } from 'src/generated/graphql';
import Layout from 'src/layouts';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { updateProfile } from 'src/redux/slice/auth.slice';
import { NextPageWithLayout } from 'src/types';
import { hashOwner } from 'src/utils/whitelistUrl';

const Profile: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { query } = useRouter();

  const [getCurrentUser, { data }] = useGetCurrentUserLazyQuery({
    variables: {
      userId: query?.id as string,
    },
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && hashOwner(String(query.id), String(user?.id))) {
      dispatch(updateProfile(data.getCurrentUser.profile));
    }
    if (query.id && hashOwner(String(query.id), String(user?.id))) {
      getCurrentUser();
    }
  }, [query, data]);

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
