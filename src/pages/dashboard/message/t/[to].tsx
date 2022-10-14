import { Box, Button, Card, Container, Stack, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ReactElement, useEffect, useState } from 'react';
import Image from 'src/components/Image';
import { ChatContent, ChatSideBar } from 'src/container/dashboard/chat';
import { useAddFriendRequestMutation, useGetUserNotCurrentQuery, User } from 'src/generated/graphql';
import useSocket from 'src/hooks/useSocket';
import Layout from 'src/layouts';
import { useAppSelector } from 'src/redux/hooks';
import { NextPageWithLayout } from 'src/types';
import socket from 'src/utils/socket';

const RootStyled = styled('div')(({ theme }) => ({}));

const PageMessage: NextPageWithLayout = () => {
  // const socket = useSocket();

  const [userResponse, setUserResponse] = useState<User[]>([]);

  return (
    <RootStyled>
      <Container maxWidth="lg">
        <Card sx={{ display: 'flex', height: '75vh' }}>
          <ChatSideBar />
          <ChatContent />
        </Card>
      </Container>
    </RootStyled>
  );
};

PageMessage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PageMessage;
