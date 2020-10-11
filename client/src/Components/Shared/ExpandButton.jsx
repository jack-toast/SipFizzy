import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';
import { ExpandMoreRounded } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const ExpandButton = ({ classes, className, expanded, onClick }) => {
  const muiClasses = useStyles();
  return (
    <IconButton
      className={clsx(muiClasses.expand, className, classes.root, {
        [muiClasses.expandOpen]: expanded,
      })}
      onClick={onClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMoreRounded className={clsx(classes.icon)} />
    </IconButton>
  );
};

ExpandButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
};

ExpandButton.defaultProps = {
  classes: {},
  className: '',
  expanded: false,
  onClick: null,
};

export default ExpandButton;
