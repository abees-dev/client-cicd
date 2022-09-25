import { Box, styled, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useMemo } from 'react';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';
import Iconify from 'src/components/Iconify';

const RootStyled = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

interface PostActionProp {
  handleClick: (value: string) => void;
}

export default function PostAction({ handleClick }: PostActionProp) {
  const LIST_BUTTON = useMemo(
    () => [
      {
        title: 'Add image',
        color: 'success.main',
        icon: 'bi:card-image',
        value: 'add',
      },
      {
        title: 'Tag user',
        color: 'info.main',
        icon: 'ci:tag',
        value: 'tag',
      },
      {
        title: 'Feeling',
        color: 'warning.main',
        icon: 'ic:outline-emoji-emotions',
        value: 'feeling',
      },
      {
        title: 'Check in',
        color: 'error.main',
        icon: 'bxs:map',
        value: 'checkin',
      },
      {
        title: 'More',
        color: 'text.secondary',
        icon: 'mingcute:more-1-line',
        value: 'more',
      },
    ],
    []
  );

  return (
    <RootStyled>
      <Typography variant="subtitle1">Add to your post</Typography>
      <Stack direction="row" spacing={1}>
        {LIST_BUTTON.map((item) => (
          <Tooltip key={item.value} title={item.title}>
            <Box>
              <IconButtonAnimate size="medium" onClick={() => handleClick(item.value)}>
                <Iconify icon={item.icon} color={item.color} sx={{ width: 18, height: 18 }} />
              </IconButtonAnimate>
            </Box>
          </Tooltip>
        ))}
      </Stack>
    </RootStyled>
  );
}
