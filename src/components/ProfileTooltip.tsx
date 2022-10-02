import { Avatar, Box, Button, Stack, Tooltip, TooltipProps, Typography } from '@mui/material';
import { capitalCase } from 'change-case';
import { ReactElement, useEffect, useState } from 'react';
import { HoverCardResponse, useHoverCardLazyQuery } from 'src/generated/graphql';
import { useAppSelector } from 'src/redux/hooks';
import { fDistanceToNow } from 'src/utils/formatTime';
import ButtonText from './ButtonText';
import Iconify from './Iconify';
import ProfileHoverSkeleton from './skeleton/ProfileHoverSkeleton';

interface ProfileTooltipProp {
  children: ReactElement;
  userId: string;
}

type ProfileTooltipType = ProfileTooltipProp & Partial<TooltipProps>;

const ProfileTooltip = ({ children, placement = 'top-end', userId, ...other }: ProfileTooltipType) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Tooltip
      title={<ProfileItem userId={userId} open={open} />}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      enterDelay={400}
      leaveDelay={100}
      placement={placement}
      {...other}
      sx={{
        maxWidth: 600,
        '& :nth-of-type(1)': {
          cursor: 'pointer',
        },
      }}
    >
      <Box>{children}</Box>
    </Tooltip>
  );
};

interface ProfileItemProp {
  userId: string;
  open: boolean;
}

function ProfileItem({ userId, open }: ProfileItemProp) {
  const [getUserHover, { data, loading }] = useHoverCardLazyQuery();

  const currentUser = useAppSelector((state) => state.auth.user);

  const [hoverCart, setHoverCard] = useState<HoverCardResponse>({
    isFriend: false,
    user: undefined,
  });

  const [isOwner, setIsOwner] = useState(false);

  const { user, isFriend } = hoverCart;

  useEffect(() => {
    if (open) {
      getUserHover({
        variables: {
          userId,
        },
      });
    }
    if (data) {
      setHoverCard(data.hoverCard as HoverCardResponse);
      setIsOwner(currentUser?.id === data.hoverCard.user?.id);
    }
  }, [open, data]);

  if (loading) {
    return (
      <Box p={1}>
        <ProfileHoverSkeleton />
      </Box>
    );
  }

  return (
    <>
      {data && !loading && (
        <Stack p={1} sx={{ width: 'fit-content' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={user?.avatar || ''} />
            <Box>
              <Typography variant="subtitle1">{capitalCase(`${user?.firstName} ${user?.lastName}`)}</Typography>
              <Typography variant="caption">Embark {fDistanceToNow(Number(user?.createdAt))}</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} mt={2} justifyContent="center">
            {!isOwner ? (
              <>
                <ButtonText
                  color="inherit"
                  sx={{ px: 2 }}
                  size="medium"
                  startIcon={<Iconify icon={isFriend ? 'bi:person-check-fill' : 'ant-design:user-add-outlined'} />}
                >
                  {isFriend ? 'friend' : 'Add friend'}
                </ButtonText>
                <Button
                  variant="contained"
                  startIcon={
                    <Iconify icon={isFriend ? 'ant-design:message-outlined' : 'healthicons:ui-user-profile'} />
                  }
                >
                  {isFriend ? 'Message' : 'View Profile'}
                </Button>
              </>
            ) : (
              <Button variant="contained" startIcon={<Iconify icon="healthicons:ui-user-profile" />}>
                Edit Profile
              </Button>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default ProfileTooltip;
