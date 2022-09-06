import { forwardRef, ReactElement } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, BoxProps } from '@mui/material';
import { PropsCustoms } from '../types/PropsTypes';

// ----------------------------------------------------------------------

interface IPage {
  title: string;
  meta?: ReactElement;
}

// eslint-disable-next-line react/display-name
const Page = forwardRef(({ children, title = '', meta, ...other }: IPage & PropsCustoms<BoxProps>, ref) => (
  <>
    <Head>
      <title>{`${title} | Page`}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
