import { styled } from '@mui/material';
import Navbar from './navbar';

const RootStyle = styled('div')(() => ({}));

export default function DashboardLayout() {
  return (
    <RootStyle>
      <Navbar />
    </RootStyle>
  );
}
