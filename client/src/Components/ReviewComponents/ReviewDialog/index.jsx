import { Dialog } from '@material-ui/core';
import { get } from 'lodash';
import React, { useMemo } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import ReviewCore from './ReviewCore';

const ReviewDialog = () => {
  const history = useHistory();
  const match = useRouteMatch('/drinks/:drinkId');
  const drinkId = useMemo(() => {
    return get(match, 'params.drinkId', '');
  }, [JSON.stringify(match)]);

  const handleCloseDialog = () => {
    // JY TODO - should use the base path so that this component could be used elsewhere.
    // Ex: If we put drinks on the home page "/", then this wouldn't work...
    // Maybe this component would be better if handled by Redux... :(
    history.push('/drinks');
  };

  const dialogOpen = !!drinkId;
  return (
    <Dialog
      open={dialogOpen}
      maxWidth="sm"
      fullWidth
      onClose={handleCloseDialog}
    >
      <ReviewCore
        drinkId={drinkId}
        open={dialogOpen}
        onClose={handleCloseDialog}
      />
    </Dialog>
  );
};

export default ReviewDialog;