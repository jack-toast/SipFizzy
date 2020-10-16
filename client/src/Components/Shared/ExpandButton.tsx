import React from 'react';
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

type Props = {
  classes?: {
    root: string;
    icon: string;
  };
  className?: string;
  expanded: boolean;
  onClick: () => void;
};

const ExpandButton: React.FC<Props> = ({
  classes = { root: '', icon: '' },
  className = '',
  expanded = false,
  onClick,
}: Props) => {
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

export default ExpandButton;
