import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';

export type Props = {
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
};

const ConfirmationDialog: React.FC<Props> = ({
  title = 'For real?',
  description = 'You sure? Like, are you absolutely certain',
  onConfirm,
  onCancel,
  open,
}: Props) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
