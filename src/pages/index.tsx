import { ReactElement } from 'react';
import CustomButton from '../components/Button';
import Page from '../components/Page';
import Layout from '../layouts';
import { useAppDispatch } from '../redux/hooks';
import { useLogout } from '../redux/slice/auth.slice';
import { LogoutTest } from '../utils/test';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(useLogout());
  };
  return (
    <Page title="home">
      <CustomButton variant="contained" onClick={handleLogout}>
        CusTom Button Mui
      </CustomButton>
    </Page>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
