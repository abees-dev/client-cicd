import { useEffect, useState } from 'react';

import FriendCard from './FriendCard';

import { Box, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import FriendSkeleton from 'src/components/skeleton/FriendSkeleton';
import {
  FriendShipRequestResponse,
  useAddFriendRequestMutation,
  useFriendRequestQuery,
  User,
} from 'src/generated/graphql';
import { useAppSelector } from 'src/redux/hooks';

export interface AcceptType {
  requester: User;
  id: string;
}

export default function FriendRequest() {
  const user = useAppSelector((state) => state.auth.user);

  const { data, loading } = useFriendRequestQuery({
    variables: {
      userId: String(user?.id),
    },
  });

  const [friendState, setFriendState] = useState<FriendShipRequestResponse>({});

  const { friendRequest } = friendState;

  useEffect(() => {
    if (data) {
      setFriendState(data.getFriendRequest as FriendShipRequestResponse);
    }
  }, [data]);

  const [acceptFriend] = useAddFriendRequestMutation();

  const handleAccepted = async ({ requester, id }: AcceptType) => {
    try {
      await acceptFriend({
        variables: {
          data: {
            addressee: requester,
            requester: user,
            type: 'accepted',
          },
        },
      });
      setFriendState((prev) => ({
        ...prev,
        friendRequest: prev.friendRequest?.filter((item) => item.id !== id),
        totalCount: Number(prev.totalCount) - 1,
      }));
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(friendState);

  return (
    <>
      <Box>
        <Typography variant="h6" mb={2}>
          Friend request
        </Typography>
        <Grid container spacing={2}>
          {!loading
            ? friendRequest?.map((item, index) => (
                <Grid key={index} xs={2}>
                  <FriendCard accept friendship={item} onAccepted={handleAccepted} />
                </Grid>
              ))
            : [...Array(6)].map((_, index) => (
                <Grid key={index} xs={2}>
                  <FriendSkeleton />
                </Grid>
              ))}
        </Grid>
        <Divider sx={{ my: 4 }} />
      </Box>
    </>
  );
}
