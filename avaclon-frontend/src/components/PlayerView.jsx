import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';

import Player from './Player';

const styles = theme => ({
  root: {},
});

class PlayerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  calculateSize(base, itemCount, baseSize, alternateSize) {
    const overBase = itemCount % base;
    return overBase > base / 2 ? baseSize : alternateSize;
  }

  expand = () => {
    this.setState({ expanded: true });
  };

  render() {
    const { classes } = this.props;
    const { players } = this.props;
    const playerCount = players.length;

    return (
      <div className={classes.root}>
        <Collapse
          in={this.state.expanded}
          onClick={this.expand}
          collapsedHeight="40px"
        >
          <Grid container justify="center">
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
        </Collapse>
      </div>
    );
  }
}

PlayerView.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
};

export default withStyles(styles)(PlayerView);
