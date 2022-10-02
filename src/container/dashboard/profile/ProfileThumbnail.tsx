import { alpha, Avatar, AvatarGroup, Box, Button, Card, Stack, styled, Typography } from '@mui/material';
import { useState } from 'react';
import Dialog from 'src/components/Dialog';
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';
import MyAvatar from 'src/components/MyAvatar';
import { useAppSelector } from 'src/redux/hooks';
import { ProfileCreateForm } from './ProfileCreateForm';

const RootStyled = styled('div')(() => ({}));

const ThumbnailStyled = styled('div')(({ theme }) => ({
  position: 'relative',

  '&::before': {
    position: 'absolute',
    content: '""',
    inset: 0,
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    zIndex: theme.zIndex.appBar,
  },
}));

const InformationStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(16),
}));

export default function ProfileThumbnail() {
  const user = useAppSelector((state) => state.auth.user);
  const [openCreateForm, setOpenCreateForm] = useState<boolean>(false);

  const handleOpenForm = () => {
    setOpenCreateForm(true);
  };

  const handleCloseForm = () => {
    setOpenCreateForm(false);
  };

  return (
    <RootStyled>
      <Card sx={{ position: 'relative' }}>
        <ThumbnailStyled>
          <Image
            src="https://storage.googleapis.com/upload-file-c/723769f79bb143cdbc9c3e49b75ed8eb.jpg"
            sx={{ maxHeight: 240 }}
          />
        </ThumbnailStyled>
        <MyAvatar
          sx={{
            height: 100,
            width: 100,
            border: '2px solid #F5F5F5',
            position: 'absolute',
            bottom: 30,
            left: 16,
            zIndex: (theme) => theme.zIndex.drawer,
          }}
        />
        <Box sx={{ height: 100, mt: 1 }}>
          <InformationStyled>
            <Stack spacing={0.5}>
              <Typography
                variant="subtitle1"
                sx={{ textTransform: 'capitalize' }}
              >{`${user?.firstName} ${user?.lastName}`}</Typography>

              <AvatarGroup
                spacing={4}
                sx={{ '& .MuiAvatar-root': { border: (theme) => `1px solid ${alpha(theme.palette.grey[50], 0.4)}` } }}
              >
                {[...Array(4)].map((_, index) => (
                  <Avatar key={index} alt="Remy Sharp" src={user?.avatar || ''} sx={{ width: 32, height: 32 }} />
                ))}
              </AvatarGroup>
            </Stack>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              sx={{
                px: 2,
              }}
              onClick={handleOpenForm}
              startIcon={<Iconify icon="ci:edit" />}
            >
              Edit profile
            </Button>
          </InformationStyled>
          <Dialog open={openCreateForm} onClose={handleCloseForm}>
            <ProfileCreateForm />
          </Dialog>
        </Box>
      </Card>
    </RootStyled>
  );
}
