import React, { ReactElement } from 'react';
import Layout from '../../layouts';
import { NextPageWithLayout } from '../_app';

const Inbox: NextPageWithLayout = () => {
  return <div>Inbox</div>;
};

Inbox.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Inbox;
