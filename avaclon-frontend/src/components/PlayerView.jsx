import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Player from './Player';

const styles = theme => ({
  root: {},
});

class PlayerView extends Component {
  calculateSize(base, itemCount, baseSize, alternateSize) {
    const overBase = itemCount % base;
    return overBase > base / 2 ? baseSize : alternateSize;
  }

  render() {
    const { classes } = this.props;
    const { players } = this.props;
    const playerCount = players.length;

    return (
      <Grid container className={classes.root} justify="center">
        {players.map(player => (
          <Grid
            item
            xs={6}
            sm={this.calculateSize(3, playerCount, 4, 6)}
            md={this.calculateSize(4, playerCount, 3, 4)}
            key={player.id}
          >
            <Player name={player.name} id={player.id} role={player.role} />
          </Grid>
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
