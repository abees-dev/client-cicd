import { InputAdornment, styled, TextField } from '@mui/material';
import React from 'react';
import Iconify from 'src/components/Iconify';

const RootStyled = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

export default function ChatSearch() {
  return (
    <RootStyled>
      <TextField
        fullWidth
        size="small"
        placeholder="Search chat"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-outline" />
            </InputAdornment>
          ),
        }}
      />
    </RootStyled>
  );
}
