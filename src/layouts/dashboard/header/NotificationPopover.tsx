import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { capitalCase } from 'change-case';
import { useRouter } from 'next/router';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';
import Iconify from 'src/components/Iconify';
import Popover from 'src/components/Popover';
import NotificationSkeleton from 'src/components/skeleton/NotificationSkeleton';
import TextMaxLine from 'src/components/TextMaxLine';
import {
  Notification,
  NotificationQueryResponse,
  useGetNotificationsQuery,
  useLittenJoinRoomSubscription,
  useMaskAsReadNotificationMutation,
} from 'src/generated/graphql';
import { useAppSelector } from 'src/redux/hooks';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { fDistanceToNow } from 'src/utils/formatTime';

const NotificationPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const user = useAppSelector((state) => state.auth.user);

  const { push } = useRouter();

  const [ref, inView] = useInView();

  const [page, setPage] = useState(0);

  const [notificationState, setNotificationState] = useState<NotificationQueryResponse>({
    totalUnread: 0,
  });

  const { notifications, totalUnread, totalPage } = notificationState;

  const { data, loading, fetchMore } = useGetNotificationsQuery({
    variables: {
      ownerId: String(user?.id),
      query: {
        page: 0,
        limit: 5,
      },
    },
  });

  useEffect(() => {
    if (data) {
      setNotificationState(data.getNotification as NotificationQueryResponse);
    }
  }, [data]);

  const handleOpenPopover = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const { data: notificationData } = useLittenJoinRoomSubscription({
    variables: {
      room: String(user?.id),
    },
  });

  useEffect(() => {
    if (notificationData) {
      setNotificationState((prev) => ({
        ...prev,
        totalUnread: prev.totalUnread + 1,
        notifications: [notificationData.littenJoinRoomRequest, ...(prev.notifications as any[])],
      }));
    }
  }, [notificationData]);

  useEffect(() => {
    if (inView && !loading) {
      fetchMore({
        variables: {
          query: {
            limit: 5,
            page: page + 1,
          },
        },
      }).then((response) => {
        const data = response?.data?.getNotification;
        if (data) {
          setNotificationState((prev) => ({
            ...data,
            notifications: [...(prev.notifications as Notification[]), ...(data.notifications as Notification[])],
          }));
        }
        setPage((prev) => prev + 1);
      });
    }
  }, [inView]);

  const [maskAsReadMutation] = useMaskAsReadNotificationMutation();

  const handleSingleUnread = async ({ read, id, type, requester }: Notification) => {
    try {
      if (!read) {
        await maskAsReadMutation({
          variables: {
            notificationInput: {
              type: 'single',
              notificationId: id,
            },
          },
        });
        setNotificationState((prev) => ({
          ...prev,
          notifications: prev.notifications?.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification
          ),
          totalUnread: prev.totalUnread - 1,
        }));
      }

      if (type === 'Friend request') {
        push(PATH_DASHBOARD.lookingFriend);
        handleClosePopover();
      }

      if (type === 'Friend accepted') {
        push(PATH_DASHBOARD.profile(requester.id as string));
        handleClosePopover();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMultipleUnread = async () => {
    try {
      if (totalUnread > 0) {
        await maskAsReadMutation({
          variables: {
            notificationInput: {
              type: 'multiple',
              ownerId: user?.id,
            },
          },
        });
        setNotificationState((prev) => ({
          ...prev,
          notifications: prev.notifications?.map((notification) => ({ ...notification, read: true })),
          totalUnread: 0,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IconButtonAnimate size="large" onClick={handleOpenPopover}>
        <Badge badgeContent={totalUnread} color="error">
          <Iconify icon="ooui:bell" sx={{ width: 22, height: 22 }} />
        </Badge>
      </IconButtonAnimate>
      <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClosePopover} sx={{ maxHeight: 600 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2, pb: 1 }}>
          <Box>
            <Typography variant="subtitle1">Notification</Typography>
            <Typography variant="caption">{`You have ${totalUnread} unread messages`}</Typography>
          </Box>
          <IconButtonAnimate size="small" onClick={handleMultipleUnread}>
            <Iconify icon="charm:tick-double" />
          </IconButtonAnimate>
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <List disablePadding>
          {!loading ? (
            notifications?.map((notification) => {
              const { id, content, createdAt, requester, read, type } = notification;
              return (
                <ListItemButton
                  key={id}
                  onClick={() => handleSingleUnread(notification)}
                  sx={{ ...(!read && { bgcolor: (theme) => theme.palette.divider }) }}
                >
                  <ListItemAvatar>
                    <Avatar src={requester.avatar || ''} />
                  </ListItemAvatar>

                  <ListItemText>
                    <TextMaxLine line={2} variant="subtitle2">
                      {capitalCase(`${requester.firstName} ${requester.lastName}`)}
                      <Typography variant="body2" component="span" ml={0.5}>
                        {content}
                      </Typography>
                    </TextMaxLine>
                    <Typography variant="caption">{fDistanceToNow(Number(createdAt))}</Typography>
                  </ListItemText>
                </ListItemButton>
              );
            })
          ) : (
            <NotificationSkeleton sx={{ px: 2, py: 1 }} />
          )}

          {!loading && Number(page) < Number(totalPage) - 1 && <NotificationSkeleton sx={{ px: 2, py: 1 }} ref={ref} />}
        </List>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            size="small"
            sx={{
              color: (theme) => theme.palette.text.primary,
              '&:hover': {
                color: (theme) => theme.palette.primary.main,
              },
            }}
          >
            View all
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default NotificationPopover;
