import React, { ReactElement } from 'react';
import { useTestListenSubscription } from 'src/generated/graphql';
import { NextPageWithLayout } from 'src/types';
import Layout from '../../layouts';

const Dashboard: NextPageWithLayout = () => {
  const { data } = useTestListenSubscription({
    variables: {
      room: '123123',
    },
    onSubscriptionComplete: () => console.log('first'),
  });

  console.log(data);

  return (
    <div>
      Dashboard
      <h1>CIDD</h1>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
