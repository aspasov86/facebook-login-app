import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { DataContext } from '../../context/DataProvder';

class StatusMessage extends Component {
  render() {
    const {
      open, message, background, closeError,
    } = this.props;
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        autoHideDuration={600}
        onClose={this.onClose}
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
              <CloseIcon style={{ fontSize: 20 }} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}

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
