import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Player from './Player';

const styles = theme => ({
  root: {},
});

class PlayerView extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        className={classes.props}
        wrap="wrap"
        justify="space-between"
      >
        {this.props.players.map(player => (
          <Player
            key={player.id}
            name={player.name}
            id={player.id}
            role={player.role}
          />
        ))}
      </Grid>
    );
  }
}

PlayerView.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
};

export default withStyles(styles)(PlayerView);
