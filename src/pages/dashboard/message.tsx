import { Box, Button, Card, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ReactElement, useEffect, useState } from 'react';
import Image from 'src/components/Image';
import { useAddFriendRequestMutation, useGetUserNotCurrentQuery, User } from 'src/generated/graphql';
import { useAppSelector } from 'src/redux/hooks';
import { NextPageWithLayout } from 'src/types';
import Layout from '../../layouts';

const PageMessage: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { data } = useGetUserNotCurrentQuery({
    variables: {
      userId: String(user?.id),
    },
  });

  const [userResponse, setUserResponse] = useState<User[]>([]);

  useEffect(() => {
    if (data) {
      setUserResponse(data.getUserNotCurrent.users as User[]);
    }
  }, [data]);

  const [addFriendMutation] = useAddFriendRequestMutation();

  const handleSendFriend = async (addressee: User) => {
    try {
      const res = await addFriendMutation({
        variables: {
          data: {
            addressee,
            requester: user,
            type: 'send', // "accepted"
          },
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box mt={8}>
      <Grid container spacing={2}>
        {userResponse.map((item, index) => (
          <Grid key={index} xs={6}>
            <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Image src={item?.avatar || ''} sx={{ height: 80, width: 80, borderRadius: 1 }} />
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flex: 1 }}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ textTransform: 'capitalize' }}
                  >{`${item?.firstName} ${item?.lastName}`}</Typography>
                  <Typography variant="caption">18/11/200</Typography>
                </Box>
                <Button variant="contained" color="info" onClick={() => handleSendFriend(item)}>
                  Add friend
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

PageMessage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PageMessage;
