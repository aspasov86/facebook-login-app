import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { DataContext } from '../../context/DataProvder';
import './StatusMessage.css';

const StatusMessage = ({
  open, message, background, closeError,
}) => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    open={open}
    autoHideDuration={2000}
    onClose={closeError}
  >
    <SnackbarContent
      style={{ background }}
      message={message}
      action={[
        <IconButton
          key="close"
          color="inherit"
          onClick={closeError}
        >
          <CloseIcon className="status-message-close-icon" />
        </IconButton>,
      ]}
    />
  </Snackbar>
);

StatusMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  closeError: PropTypes.func.isRequired,
};

const StatusMessageWithContext = props => (
  <DataContext.Consumer>
    {dataContext => (
      <StatusMessage
        open={dataContext.state.error}
        message={dataContext.state.errorMessage}
        background={dataContext.state.errorState}
        closeError={dataContext.actions.removeError}
        {...props}
      />
    )}
  </DataContext.Consumer>
);

export default StatusMessageWithContext;
