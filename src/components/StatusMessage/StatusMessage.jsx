import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DataContext } from '../../context/DataProvder';
import './StatusMessage.css';

const StatusMessage = ({
  open, message, background, closeError, closeLoader, loading,
}) => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    open={open}
    autoHideDuration={2000}
    onClose={closeError}
  >
    <SnackbarContent
      style={{ background: loading ? 'gray' : background }}
      message={loading ? <CircularProgress /> : message}
      action={[
        <IconButton
          key="close"
          color="inherit"
          onClick={loading ? closeLoader : closeError}
        >
          <CloseIcon className="status-message-close-icon" />
        </IconButton>,
      ]}
    />
  </Snackbar>
);

StatusMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  closeError: PropTypes.func.isRequired,
  closeLoader: PropTypes.func.isRequired,
};

const StatusMessageWithContext = props => (
  <DataContext.Consumer>
    {dataContext => (
      <StatusMessage
        open={dataContext.state.error || dataContext.state.loading}
        loading={dataContext.state.loading}
        message={dataContext.state.errorMessage}
        background={dataContext.state.errorState}
        closeError={dataContext.actions.removeError}
        closeLoader={dataContext.actions.closeLoader}
        {...props}
      />
    )}
  </DataContext.Consumer>
);

export default StatusMessageWithContext;
