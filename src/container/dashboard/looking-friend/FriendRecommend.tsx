import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
import Image from 'src/components/Image';
import FriendSkeleton from 'src/components/skeleton/FriendSkeleton';
import { useAddFriendRequestMutation, useFriendShipRecommendQuery, User } from 'src/generated/graphql';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { updateFriendWaiting } from 'src/redux/slice/friendWaiting.slice';
import { loadDataRecommend, updateUserRecommend } from 'src/redux/slice/userRecommend.slice';
import { fDistanceToNow } from 'src/utils/formatTime';

interface ILoading {
  [key: string]: boolean;
}

export default function RecommendFriend() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<ILoading>({});

  const { data, loading } = useFriendShipRecommendQuery({
    variables: {
      userId: String(user?.id),
    },
  });

  const { users } = useAppSelector((state) => state.userRecommend);

  useEffect(() => {
    if (data) {
      dispatch(loadDataRecommend(data.friendShipRecommend));
    }
  }, [data]);

  const [addFriendMutation, { loading: loadingMutation }] = useAddFriendRequestMutation();

  useEffect(() => {
    if (!loadingMutation) {
      setIsLoading({});
    }
  }, [loadingMutation]);

  const handleSendFriend = async (addressee: User) => {
    try {
      setIsLoading({ [String(addressee.id)]: true });
      await addFriendMutation({
        variables: {
          data: {
            addressee,
            requester: user,
            type: 'send', // "accepted"
          },
        },
      });
      dispatch(
        updateFriendWaiting({
          accepted: false,
          addressee,
          requester: user,
        })
      );
      dispatch(updateUserRecommend({ id: addressee.id }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box>
        <Typography variant="h6" mb={2}>
          Recommend friends
        </Typography>

        <Grid container spacing={2}>
          {!loading
            ? users?.map((item, index) => (
                <Grid key={index} xs={2}>
                  <Card>
                    <Image src={item?.avatar || ''} ratio="6/4" />
                    <Box p={1}>
                      <Typography variant="subtitle1">{capitalCase(`${item?.firstName} ${item?.lastName}`)}</Typography>
                      <Typography variant="caption">{fDistanceToNow(Number(item?.createdAt))}</Typography>
                      <Stack spacing={1} mt={2}>
                        <LoadingButton
                          loading={isLoading[String(item.id)]}
                          variant="contained"
                          size="small"
                          fullWidth
                          onClick={() => handleSendFriend(item)}
                        >
                          Add friend
                        </LoadingButton>

                        <Button
                          size="small"
                          color="inherit"
                          fullWidth
                          sx={{
                            bgcolor: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700],
                          }}
                        >
                          View profile
                        </Button>
                      </Stack>
                    </Box>
                  </Card>
                </Grid>
              ))
            : [...Array(6)].map((_, index) => (
                <Grid key={index} xs={2}>
                  <FriendSkeleton />
                </Grid>
              ))}
        </Grid>
      </Box>
    </>
  );
}
