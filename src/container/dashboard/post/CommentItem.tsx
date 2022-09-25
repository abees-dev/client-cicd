import { alpha, Box, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import MyAvatar from 'src/components/MyAvatar';
import { useAppSelector } from 'src/redux/hooks';

const CommentsItemStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: alpha(theme.palette.divider, 0.2),
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  width: 'fit-content',
}));

const ActionStyled = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  fontWeight: 700,
  cursor: 'pointer',

  '&:hover': {
    textDecoration: 'underline',
  },
}));
export default function CommentItem() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Stack direction="row" spacing={1}>
      <MyAvatar sx={{ width: 35, height: 35 }} />
      <Box>
        <CommentsItemStyled>
          <Stack>
            <Typography
              variant="caption"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 700,
              }}
            >{`${user?.firstName} ${user?.lastName}`}</Typography>
            <Typography variant="body2" sx={{ lineHeight: (theme) => theme.typography.caption.lineHeight }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, cumque cupiditate, aut neque sed
              dolore et doloremque quis, voluptatem blanditiis eveniet voluptates. Facere, dignissimos soluta? Quod
              exercitationem nam eaque fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ad
              autem architecto, doloribus nulla velit consequuntur ipsa nemo ipsam debitis, cum animi recusandae culpa
              rerum cumque possimus quis reiciendis voluptate.
            </Typography>
          </Stack>
        </CommentsItemStyled>
        <Stack direction="row" spacing={2} mt={0.5} ml={1} alignItems="baseline">
          <ActionStyled>Like</ActionStyled>
          <ActionStyled>Feedback</ActionStyled>
          <ActionStyled>Share</ActionStyled>
          <ActionStyled sx={{ fontWeight: 300, fontSize: 11 }}>13 house</ActionStyled>
        </Stack>
      </Box>
    </Stack>
  );
}
