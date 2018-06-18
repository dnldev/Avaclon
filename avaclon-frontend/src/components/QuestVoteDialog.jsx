import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

import strings from '../localization/game-locale';

import fail from './../static/images/fail.jpg';
import success from './../static/images/success.jpg';
import { Grid } from '@material-ui/core';

const images = {
  fail: fail,
  success: success,
};

const style = () => ({
  root: {},
  mainGrid: {},
  voteImage: {
    borderRadius: 60,
    cursor: 'pointer',
    marginBottom: 0,
    margin: '0 5%',
    width: '90%',
  },
  voteText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

class QuestVoteDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleFail = this.handleFail.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  handleSuccess() {
    this.props.onClose(true);
  }

  handleFail() {
    this.props.onClose(false);
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        className={classes.root}
        open={this.props.open}
        PaperProps={{
          elevation: 0,
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            padding: '0 8px',
            paddingBottom: '20px',
            width: '50%',
          },
        }}
      >
        <DialogActions>
          <Grid container className={classes.mainGrid} alignContent="center">
            <Grid item xs={6}>
              <Typography
                gutterBottom
                className={classes.voteText}
                align="center"
                variant="display2"
              >
                {strings.quest.success}
              </Typography>
              <img
                className={classes.voteImage}
                alt={strings.quest.success}
                src={images.success}
                onClick={this.handleSuccess}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography
                gutterBottom
                className={classes.voteText}
                align="center"
                variant="display2"
              >
                {strings.quest.failure}
              </Typography>
              <img
                className={classes.voteImage}
                alt={strings.quest.failure}
                src={images.fail}
                onClick={this.handleFail}
              />
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    );
  }
}

QuestVoteDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(style)(QuestVoteDialog);
