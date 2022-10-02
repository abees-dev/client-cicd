import { Box, Button, Card, Stack, styled, Typography } from '@mui/material';
import { capitalCase } from 'change-case';
import Image from 'src/components/Image';
import { Friendship, User } from 'src/generated/graphql';
import { fDistanceToNow } from 'src/utils/formatTime';
import { AcceptType } from './FriendRequest';

const RootStyled = styled('div')(({}) => ({}));

interface FriendCardProps {
  accept?: boolean;
  friendship: Friendship;
  onAccepted?: (data: AcceptType) => void;
}

export default function FriendCard({ accept, friendship, onAccepted }: FriendCardProps) {
  const handleSend = (data: string) => {};

  const generate = () => {
    const { addressee, requester } = friendship;
    if (accept) {
      return {
        id: friendship.id,
        fullName: `${requester.firstName} ${requester.lastName} `,
        avatar: requester.avatar,
        createdAt: requester.createdAt,
        requester,
      };
    }
    return {
      id: friendship.id,
      fullName: `${addressee.firstName} ${addressee.lastName} `,
      avatar: addressee.avatar,
      createdAt: addressee.createdAt,
      addressee,
    };
  };
  return (
    <RootStyled>
      <Card>
        <Image src={generate().avatar || ''} ratio="6/4" />
        <Box p={1}>
          <Typography variant="subtitle1">{capitalCase(generate().fullName)}</Typography>
          <Typography variant="caption">{fDistanceToNow(Number(generate().createdAt))}</Typography>
          <Stack spacing={1} mt={2}>
            {accept ? (
              <Button
                variant="contained"
                size="small"
                fullWidth
                onClick={() =>
                  onAccepted && onAccepted({ id: String(generate().id), requester: generate().requester as User })
                }
              >
                Accept
              </Button>
            ) : (
              <Button variant="contained" size="small" fullWidth>
                Invitation sent
              </Button>
            )}

            <Button
              size="small"
              color="inherit"
              fullWidth
              sx={{
                bgcolor: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700],
              }}
            >
              {accept ? 'Remove' : 'View profile'}
            </Button>
          </Stack>
        </Box>
      </Card>
    </RootStyled>
  );
}
