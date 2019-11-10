/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List } from '@material-ui/core';
import {
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';
import classNames from 'classnames';

// styles
import useStyles from './styles';


// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from '../LayoutContext';


function Sidebar({ renderBody }) {
  const classes = useStyles();
  const theme = useTheme();
  // local
  const [isPermanent, setPermanent] = useState(true);

  function handleWindowWidthChange() {
    const windowWidth = window.innerWidth;
    const breakpointWidth = theme.breakpoints.values.md;
    const isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }

  // global
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  useEffect(() => {
    window.addEventListener('resize', handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener('resize', handleWindowWidthChange);
    };
  });
  const Content = renderBody;
  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    // anchor={irRtl ? 'right' : 'left'}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        <Content isSidebarOpened={isSidebarOpened} />
      </List>
    </Drawer>
  );
}

export default Sidebar;
