import { Button, Grid, Stack } from '@mui/material';
import React from 'react';
import Iconify from '../../components/Iconify';

export default function SocialButton() {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        fullWidth
        size="large"
        sx={{ color: (theme) => theme.palette.grey[400] }}
        startIcon={<Iconify icon="flat-color-icons:google" />}
      >
        Google
      </Button>

      <Button
        variant="outlined"
        fullWidth
        size="large"
        sx={{ color: (theme) => theme.palette.grey[400] }}
        startIcon={<Iconify icon="ant-design:github-filled" />}
      >
        Github
      </Button>
    </Stack>
  );
}
