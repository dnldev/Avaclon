import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import Player from './Player';

const styles = () => ({
  root: {},
  toggleButton: {
    width: '100%',
  },
});

class PlayerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.expand = this.expand.bind(this);
    this.toggleExpansion = this.toggleExpansion.bind(this);
  }

  calculateSize(base, itemCount, baseSize, alternateSize) {
    const overBase = itemCount % base;
    return overBase > base / 2 ? baseSize : alternateSize;
  }

  expand() {
    this.setState({ expanded: true });
  }

  playerInTeam(id) {
    return this.props.teamIds.indexOf(id) >= 0;
  }

  toggleExpansion() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes } = this.props;
    const { players } = this.props;
    const playerCount = players.length;

    return (
      <div className={classes.root}>
        <Collapse
          collapsedHeight="48px"
          in={this.state.expanded}
          onClick={this.expand}
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
                <Player
                  id={player.id}
                  inTeam={() => this.playerInTeam(player.id)}
                  isLeader={player.id === this.props.leaderId}
                  name={player.name}
                  role={player.role}
                />
              </Grid>
            ))}
          </Grid>
        </Collapse>
        <Button className={classes.toggleButton} onClick={this.toggleExpansion}>
          <Icon>{this.state.expanded ? 'expand_less' : 'expand_more'}</Icon>
        </Button>
      </div>
    );
  }
}

PlayerView.propTypes = {
  classes: PropTypes.object.isRequired,
  leaderId: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  teamIds: PropTypes.array.isRequired,
};

export default withStyles(styles)(PlayerView);
