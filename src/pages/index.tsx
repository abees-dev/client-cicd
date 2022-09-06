import { ReactElement } from 'react';
import CustomButton from '../components/Button';
import Page from '../components/Page';
import Layout from '../layouts';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <Page title="home">
      <CustomButton variant="contained">CusTom Button Mui</CustomButton>
    </Page>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
