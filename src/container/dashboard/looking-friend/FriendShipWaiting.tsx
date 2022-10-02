import { useEffect } from 'react';

import FriendCard from './FriendCard';

import { Box, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import FriendSkeleton from 'src/components/skeleton/FriendSkeleton';
import { useFriendWaitingQuery, User } from 'src/generated/graphql';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { loadDataWaiting } from 'src/redux/slice/friendWaiting.slice';
import { isEmpty } from 'lodash';

export interface AcceptType {
  requester: User;
  id: string;
}

export default function FriendShipWaiting() {
  const user = useAppSelector((state) => state.auth.user);

  const { data, loading } = useFriendWaitingQuery({
    variables: {
      userId: String(user?.id),
    },
  });

  const { friendRequest } = useAppSelector((state) => state.friendWaiting);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(loadDataWaiting(data.friendWaiting));
    }
  }, [data]);

  return (
    <>
      <Box>
        <Typography variant="h6" mb={2}>
          Waiting to accept friend request
        </Typography>
        <Grid container spacing={2}>
          {!loading
            ? friendRequest?.map((item, index) => (
                <Grid key={index} xs={2}>
                  <FriendCard friendship={item} />
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
