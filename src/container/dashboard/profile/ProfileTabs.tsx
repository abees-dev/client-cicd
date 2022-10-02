import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import useTabs from 'src/hooks/useTabs';
import { alpha, styled, Typography } from '@mui/material';
import { ProfilePost } from './ProfilePost';
import { ProfileFriendList } from './ProfileFriendList';

interface ProfileTabsList {
  value: string;
  label?: string;
  component?: React.ReactElement;
}

const TabRootStyled = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
}));

export default function ProfileTabs() {
  const [currenTabs, onChangeTabs] = useTabs('posts');

  const PROFILE_TABS: ProfileTabsList[] = [
    {
      value: 'posts',
      component: <ProfilePost />,
    },
    {
      value: 'friend',
      component: <ProfileFriendList />,
    },
    {
      value: 'introduce',
      component: <Typography>introduce</Typography>,
    },
  ];

  return (
    <TabRootStyled>
      <Tabs value={currenTabs} onChange={onChangeTabs} variant="scrollable">
        {PROFILE_TABS.map(({ value }) => (
          <Tab
            disableFocusRipple
            key={value}
            value={value}
            label={value}
            sx={{
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.light, 0.09),
                borderRadius: 1,
              },
            }}
          />
        ))}
      </Tabs>

      {PROFILE_TABS.map(({ value, component }) => value === currenTabs && <Box key={value}>{component}</Box>)}
    </TabRootStyled>
  );
}
