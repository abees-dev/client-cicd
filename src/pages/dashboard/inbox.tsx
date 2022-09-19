import React, { ReactElement } from 'react';
import { NextPageWithLayout } from 'src/types';
import Layout from '../../layouts';

const Inbox: NextPageWithLayout = () => {
  return <div>Inbox</div>;
};

Inbox.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Inbox;
