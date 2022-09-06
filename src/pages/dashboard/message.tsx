import React, { ReactElement } from 'react';
import Layout from '../../layouts';
import { NextPageWithLayout } from '../_app';

const Message: NextPageWithLayout = () => {
  return <div>Message</div>;
};

Message.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Message;
