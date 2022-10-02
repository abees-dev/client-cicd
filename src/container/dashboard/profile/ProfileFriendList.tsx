import { Box, Card, InputAdornment, Stack, styled, TextField, Typography } from '@mui/material';
import React from 'react';
import Iconify from 'src/components/Iconify';
import Grid from '@mui/material/Unstable_Grid2';
import { useAppSelector } from 'src/redux/hooks';
import Image from 'src/components/Image';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';

const RootStyled = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const ProfileFriendList = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <RootStyled>
      <Card sx={{ px: 2, py: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Friend</Typography>
          <TextField
            size="small"
            label="Search friend"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="ei:search" sx={{ width: 24, height: 24 }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Box mt={2}>
          <Grid container spacing={2}>
            {[...Array(20)].map((_, index) => (
              <Grid key={index} xs={6}>
                <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Image src={user?.avatar || ''} sx={{ height: 80, width: 80, borderRadius: 1 }} />
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flex: 1 }}>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ textTransform: 'capitalize' }}
                      >{`${user?.firstName} ${user?.lastName}`}</Typography>
                      <Typography variant="caption">18/11/200</Typography>
                    </Box>
                    <IconButtonAnimate>
                      <Iconify icon="bx:dots-horizontal-rounded" />
                    </IconButtonAnimate>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Card>
    </RootStyled>
  );
};
