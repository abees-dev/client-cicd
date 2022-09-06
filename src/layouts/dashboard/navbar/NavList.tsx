import { useRouter } from 'next/router';
import { useState } from 'react';
// @mui
import { Collapse, List } from '@mui/material';
//
import { getActive, IChildren, IList } from './navConfig';
import { NavItemRoot, NavItemSub } from './NavItem';

// ----------------------------------------------------------------------

interface INavListRoot {
  list: IList;
  isCollapse: boolean;
}

export function NavListRoot({ list, isCollapse }: INavListRoot) {
  const { pathname, asPath } = useRouter();
  // console.log(pathname, asPath);

  const active = getActive(list.path, pathname, asPath);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemRoot item={list} isCollapse={isCollapse} active={active} open={open} onOpen={() => setOpen(!open)} />

        {!isCollapse && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {(list.children || []).map((item) => (
                <NavListSub key={item.title} list={item} isCollapse={isCollapse} />
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />;
}

// ----------------------------------------------------------------------

interface INavListSub {
  list: IList | IChildren;
  isCollapse?: boolean;
}

function NavListSub({ list, isCollapse }: INavListSub) {
  const { pathname, asPath } = useRouter();

  const active = getActive(list.path, pathname, asPath);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemSub item={list} onOpen={() => setOpen(!open)} open={open} active={active} />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {(list.children || []).map((item) => (
              <NavItemSub
                key={item.title}
                item={item}
                isCollapse={isCollapse}
                active={getActive(item.path, pathname, asPath)}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return <NavItemSub item={list} active={active} />;
}
