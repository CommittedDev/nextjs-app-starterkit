/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { i18n } from 'src/i18n';
import i18Config from 'src/i18n/config';

const useStyles = makeStyles(() => createStyles({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0.5,
    zIndex: 10000,
  },
  button: {
    fontSize: 10,
    padding: '3px 10px',
    minWidth: 'inherit',
    margin: 5,
  },
}));

function LocalButton() {
  const [isMount, setState] = useState(false);
  useEffect(() => {
    // Update the document title using the browser API
    setState(true);
  });
  const classes = useStyles();
  if (!isMount) return <div className={`${classes.root} local_component`} />;
  return (
    <div className={`${classes.root} local_component`}>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button className={classes.button} variant="contained" {...bindTrigger(popupState)}>
              {i18n.language || ''}
            </Button>
            <Menu {...bindMenu(popupState)}>
              {((
                i18Config.localeSubpaths
                  ? Object.keys(i18Config.localeSubpaths)
                  : i18Config.otherLanguages)
              ).map((lang) => (
                <MenuItem
                  key={lang}
                  onClick={() => {
                    popupState.close();
                    i18n.changeLanguage(lang);
                  }}
                >
                  {lang}
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </div>
  );
}

export default LocalButton;
