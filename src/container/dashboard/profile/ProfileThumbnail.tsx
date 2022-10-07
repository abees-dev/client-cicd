import { LoadingButton } from '@mui/lab';
import { alpha, Avatar, AvatarGroup, Box, Button, Card, IconButton, Stack, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { uploadSingle } from 'src/api/upload';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';
import Dialog from 'src/components/Dialog';
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';
import MyAvatar from 'src/components/MyAvatar';
import { UploadSingle } from 'src/components/upload';
import { useGetCurrentUserLazyQuery, User, useUploadAvatarMutation } from 'src/generated/graphql';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { updateAvatarRedux } from 'src/redux/slice/auth.slice';
import { closeModal, openModal } from 'src/redux/slice/modal.slice';
import { FileType } from 'src/types';
import { hashOwner } from 'src/utils/whitelistUrl';
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

const MyAvatarStyled = styled(Avatar)(({ theme }) => ({
  height: 100,
  width: 100,
  border: '2px solid #F5F5F5',
  zIndex: theme.zIndex.drawer,
  cursor: 'pointer',
  '&:hover::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: theme.palette.divider,
  },
}));

const BoxAvatarStyled = styled('div')(({ theme }) => ({
  height: 100,
  width: 100,
  position: 'absolute',
  bottom: 30,
  left: 16,
  overflow: 'hidden',
  borderRadius: '100%',
}));

interface ItemAvatarProp {
  open: boolean;
}

const ItemAvatarStyled = styled('div')<ItemAvatarProp>(({ theme, open }) => ({
  position: 'absolute',
  inset: 0,
  top: open ? '60%' : '110%',
  backgroundColor: alpha(theme.palette.grey[500], 0.4),
  zIndex: theme.zIndex.drawer,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function ProfileThumbnail() {
  const user = useAppSelector((state) => state.auth.user);
  const [file, setFile] = useState<Partial<FileType>>({});
  const [owner, setOwner] = useState(false);
  const [currentUser, setCurrenUser] = useState<Partial<User>>({});

  const { query } = useRouter();
  const modal = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const [isHoverAvatar, setIsHoverAvatar] = useState(false);

  const handleOpenModal = (name: string) => {
    dispatch(openModal(name));
  };

  const handleCloseModal = (name: string) => {
    dispatch(closeModal(name));
  };

  const handleMouseEnter = () => {
    if (hashOwner(String(query.id), String(user?.id))) {
      setIsHoverAvatar(true);
    }
  };

  const handleMouseLeave = () => {
    if (hashOwner(String(query.id), String(user?.id))) {
      setIsHoverAvatar(false);
    }
  };

  const ondrop = useCallback(
    (acceptedFiles: FileType[]) => {
      const file = acceptedFiles[0];

      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    },
    [setFile]
  );
  const [getCurrentUser, { data }] = useGetCurrentUserLazyQuery();

  useEffect(() => {
    setOwner(hashOwner(String(query.id), String(user?.id)));
    getCurrentUser({
      variables: {
        userId: query.id as string,
      },
    });
  }, [query]);

  useEffect(() => {
    if (data) {
      setCurrenUser(data?.getCurrentUser as User);
    }
  }, [data]);

  const [uploadAvatarMutation, { loading }] = useUploadAvatarMutation();

  const handleUploadAvatar = async () => {
    try {
      const formData = new FormData();
      if (!file) return;

      formData.append('file', file as FileType);
      const res = await uploadSingle(formData);

      await uploadAvatarMutation({
        variables: {
          url: res.upload.url,
          userId: user?.id as string,
        },
      });
      dispatch(updateAvatarRedux(res.upload.url));
      handleCloseModal('avatar');
      setFile({});
    } catch (error) {
      console.log(error);
    }
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
        <BoxAvatarStyled onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <MyAvatarStyled src={currentUser.avatar || ''} />
          {owner && isHoverAvatar && (
            <ItemAvatarStyled open={isHoverAvatar}>
              <IconButton size="small" onClick={() => handleOpenModal('avatar')}>
                <Iconify icon="fa:camera" color="#FFF" />
              </IconButton>
            </ItemAvatarStyled>
          )}
        </BoxAvatarStyled>

        <Box sx={{ height: 100, mt: 1 }}>
          <InformationStyled>
            <Stack spacing={0.5}>
              <Typography
                variant="subtitle1"
                sx={{ textTransform: 'capitalize' }}
              >{`${currentUser?.firstName} ${currentUser?.lastName}`}</Typography>

              <AvatarGroup
                spacing={4}
                sx={{ '& .MuiAvatar-root': { border: (theme) => `1px solid ${alpha(theme.palette.grey[50], 0.4)}` } }}
              >
                {[...Array(4)].map((_, index) => (
                  <Avatar key={index} alt="Remy Sharp" src={user?.avatar || ''} sx={{ width: 32, height: 32 }} />
                ))}
              </AvatarGroup>
            </Stack>
            {owner && (
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                sx={{
                  px: 2,
                }}
                onClick={() => handleOpenModal('editProfile')}
                startIcon={<Iconify icon="ci:edit" />}
              >
                Edit profile
              </Button>
            )}
          </InformationStyled>
          <Dialog open={(modal['editProfile'] as boolean) || false} onClose={() => handleCloseModal('editProfile')}>
            <ProfileCreateForm />
          </Dialog>

          <Dialog open={(modal['avatar'] as boolean) || false} onClose={() => handleCloseModal('avatar')}>
            <Box sx={{ p: 2 }}>
              <UploadSingle file={file} onDrop={ondrop} sx={{ height: 400 }} />
              <Stack mt={2}>
                <LoadingButton loading={loading} variant="contained" onClick={handleUploadAvatar}>
                  Upload
                </LoadingButton>
              </Stack>
            </Box>
          </Dialog>
        </Box>
      </Card>
    </RootStyled>
  );
}
