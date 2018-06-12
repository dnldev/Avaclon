import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import strings from '../localization/game-locale';

import { BackendContext } from './context';

const styles = theme => ({
  root: {
    // backgroundColor: theme.palette.secondary.light,
    paddingBottom: '2em',
  },
  userButton: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
  },
});

class AdminArea extends Component {
  render() {
    const { classes } = this.props;

    return (
      <BackendContext.Consumer>
        {context => {
          return (
            <Paper className={classes.root} elevation={1}>
              <Button
                className={classes.userButton}
                color="primary"
                variant="raised"
                onClick={context.switchLanguage}
              >
                {strings.switchLanguage}
              </Button>
            </Paper>
          );
        }}
      </BackendContext.Consumer>
    );
  }
}

AdminArea.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminArea);
