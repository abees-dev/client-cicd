import { styled } from '@mui/material';
import React from 'react';
import CommentItem from './CommentItem';

const RootStyled = styled('div')(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(2),
}));

export default function CommentList() {
  return (
    <RootStyled>
      <CommentItem />
    </RootStyled>
  );
}
