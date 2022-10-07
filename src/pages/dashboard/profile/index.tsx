import { Container } from '@mui/material';
import { ReactElement, useEffect } from 'react';
import { ProfileTabs, ProfileThumbnail } from 'src/container/dashboard/profile';
import { useGetCurrentUserQuery } from 'src/generated/graphql';
import Layout from 'src/layouts';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { updateProfile } from 'src/redux/slice/auth.slice';
import { NextPageWithLayout } from 'src/types';

const Profile: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { data } = useGetCurrentUserQuery({
    variables: {
      userId: user?.id as string,
    },
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(updateProfile(data.getCurrentUser.profile));
    }
  }, [data]);

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
