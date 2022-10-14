import {
  Avatar,
  Box,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Iconify from 'src/components/Iconify';
import MyAvatar from 'src/components/MyAvatar';
import ScrollBar from 'src/components/ScrollBar';
import TextMaxLine from 'src/components/TextMaxLine';
import { NAVBAR } from 'src/config';
import { Maybe, Participants, useChatListSideBarQuery, User } from 'src/generated/graphql';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setReceiver } from 'src/redux/slice/receiver.slice';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { fDistanceStrict, fDistanceToNow } from 'src/utils/formatTime';
import ChatSearch from './ChatSearch';

const RootStyled = styled('div')(({ theme }) => ({
  width: NAVBAR.NAV_DESKTOP_WIDTH,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  height: '100%',
  borderRight: `1px dashed ${theme.palette.divider}`,
  position: 'relative',
}));

export default function ChatSideBar() {
  const user = useAppSelector((state) => state.auth.user);
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const [chatSideBar, setChatSideBar] = useState<Participants[]>([]);

  const { data } = useChatListSideBarQuery({
    variables: {
      userId: user?.id as string,
    },
  });

  useEffect(() => {
    if (data) {
      setChatSideBar(data.listSideBar as Participants[]);
    }
  }, [data]);

  const handleSelectChat = (id: string, user: User) => {
    push(PATH_DASHBOARD.messageTo(id));
    dispatch(setReceiver(user));
  };

  return (
    <RootStyled>
      <Stack direction="row" justifyContent="space-between" alignItems="center" px={2} pt={2}>
        <MyAvatar />
        <IconButton>
          <Iconify icon="eva:arrow-ios-back-fill" />
        </IconButton>
      </Stack>

      <ChatSearch />

      <ScrollBar sx={{ position: 'absolute', inset: 0, top: 128 }}>
        <Box sx={{ px: 1 }}>
          <List>
            {chatSideBar.map((item, index) => {
              const { user: receiver, conversation, lastMessage, seen } = item;
              return (
                <ListItemButton
                  key={index}
                  sx={{ borderRadius: 1 }}
                  onClick={() => handleSelectChat(conversation.id as string, receiver as User)}
                >
                  <ListItemAvatar>
                    <Avatar src={user?.avatar || ''} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <TextMaxLine
                        line={1}
                        variant="subtitle2"
                        sx={{ textTransform: 'capitalize' }}
                      >{`${receiver?.firstName} ${receiver?.lastName}`}</TextMaxLine>
                    }
                    secondary={
                      <TextMaxLine line={1} variant="caption">
                        {lastMessage}
                      </TextMaxLine>
                    }
                  />
                  <ListItemText
                    sx={{ flex: '0 0 auto' }}
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {fDistanceStrict('2022-10-09T03:42:08.550Z')}
                      </Typography>
                    }
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </ScrollBar>
    </RootStyled>
  );
}
