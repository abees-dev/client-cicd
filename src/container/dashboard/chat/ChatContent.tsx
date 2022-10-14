import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  IconButton,
  InputAdornment,
  ListItemText,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { capitalCase } from 'change-case';
import { useRouter } from 'next/router';
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import Iconify from 'src/components/Iconify';
import ScrollBar from 'src/components/ScrollBar';
import {
  GetFriendResponse,
  PrivateChat,
  useGetChatsLazyQuery,
  useGetFriendLazyQuery,
  User,
  useSendMessageMutation,
} from 'src/generated/graphql';
import { useAppSelector } from 'src/redux/hooks';
import { fDistanceStrict } from 'src/utils/formatTime';
import socket from 'src/utils/socket';
import ChatInput from './ChatInput';
import ChatItem from './ChatItem';

const RootStyled = styled('div')(() => ({
  flex: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const ChatHeaderStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px dashed ${theme.palette.divider}`,
}));

const ContentStyled = styled('div')(() => ({
  flex: 1,
  position: 'relative',
}));

export default function ChatContent() {
  const user = useAppSelector((state) => state.auth.user);
  const receiver = useAppSelector((state) => state.receiver.user);

  const [hashNew, setHashNew] = useState(false);

  const { query } = useRouter();

  const [recommendUserSend, setRecommendUserSend] = useState<GetFriendResponse>({});

  const [listReceiver, setListReceiver] = useState<User[]>([]);
  const [listChat, setListChat] = useState<PrivateChat[]>([]);

  const [message, setMessage] = useState('');

  const { friends } = recommendUserSend;

  const [getFriends, { data, loading }] = useGetFriendLazyQuery({
    variables: {
      userId: user?.id as string,
      query: {
        limit: 10,
      },
    },
  });

  const [getChat, { data: chatQuery }] = useGetChatsLazyQuery();

  useQuery(
    ['chats', { conversion: query.to }],
    () =>
      getChat({
        variables: {
          conversionId: query.to as string,
        },
      }),
    {
      enabled: !!query.to && !hashNew,
    }
  );

  useEffect(() => {
    socket.on('PRIVATE_CHAT', (response) => {
      console.log(response);
      if (response) {
        setListChat((prev) => [...prev, response]);
      }
    });
  }, []);

  useEffect(() => {
    if (data) {
      setRecommendUserSend(data?.getFriends as GetFriendResponse);
    }
    if (hashNew) {
      getFriends();
    }
  }, [hashNew, data]);

  useEffect(() => {
    if (query) {
      setHashNew(query.to === 'new');
    }
  }, [query]);

  useEffect(() => {
    if (chatQuery) {
      setListChat(chatQuery.getChats as PrivateChat[]);
    }
  }, [chatQuery]);

  const handleSelectAction = (_: SyntheticEvent<Element, Event>, value: User[]) => {
    setListReceiver(value);
  };

  console.log(listReceiver);

  const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setMessage(event.target.value);
  };

  const [sendMessage] = useSendMessageMutation();

  const handleSendMessage = async () => {
    try {
      const res = await sendMessage({
        variables: {
          data: {
            message,
            receiver: hashNew ? listReceiver : [receiver],
            sender: user,
          },
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <RootStyled>
      <ChatHeaderStyled>
        {!hashNew ? (
          <>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar src={user?.avatar || ''} sx={{ width: 45, height: 45 }} />
              <ListItemText
                primary={<Typography variant="subtitle1">Abeess</Typography>}
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {fDistanceStrict('2022-10-09T03:42:08.550Z')}
                  </Typography>
                }
              />
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <IconButton>
                <Iconify icon="fluent:call-28-filled" sx={{ height: 18 }} />
              </IconButton>

              <IconButton>
                <Iconify icon="bi:camera-video-fill" height={14} />
              </IconButton>

              <IconButton>
                <Iconify icon="fluent:more-horizontal-16-filled" />
              </IconButton>
            </Stack>
          </>
        ) : (
          <Stack direction="row" sx={{ width: 1 }} alignItems="center" spacing={1}>
            <Typography
              variant="subtitle2"
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              Send To:
            </Typography>
            <Autocomplete
              multiple
              fullWidth
              disableClearable={true}
              loading={loading}
              popupIcon=""
              sx={{
                '& 	.MuiAutocomplete-tag': {
                  my: 0,
                },
              }}
              options={friends || []}
              onChange={handleSelectAction}
              filterSelectedOptions
              getOptionLabel={(option) => capitalCase(`${option?.firstName} ${option?.lastName}`) || ''}
              renderTags={(value: User[], getTagProps) =>
                value.map((option: User, index: number) => (
                  <Chip
                    variant="filled"
                    sx={{ my: 0 }}
                    label={capitalCase(`${option?.firstName} ${option?.lastName}`)}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderOption={(prop, option) => (
                <Box component="li" {...prop}>
                  <Avatar src={user?.avatar || ''} sx={{ width: 35, height: 35 }} />
                  <Typography variant="body1" color="text.secondary" ml={1}>
                    {capitalCase(`${option?.firstName} ${option?.lastName}`)}
                  </Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                />
              )}
            />
          </Stack>
        )}
      </ChatHeaderStyled>

      <ContentStyled>
        <ChatInput onChange={handleOnchange} value={message} setValue={setMessage} sendSubmit={handleSendMessage} />
        <ScrollBar
          sx={{
            position: 'absolute',
            inset: 0,
            top: 8,
            bottom: 64,
            px: 2,
          }}
        >
          {listChat.map((item, index) => (
            <ChatItem key={index} data={item} reply={item.sender.id !== user?.id} />
          ))}
        </ScrollBar>
      </ContentStyled>
    </RootStyled>
  );
}
