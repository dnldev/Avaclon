import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const style = () => ({
  root: {},
});

class PlayerDialog extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Dialog className={classes.root}>
        <DialogTitle />
      </Dialog>
    );
  }
}

PlayerDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(PlayerDialog);
