import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Player from './Player';

const style = () => ({
  root: {},
  selected: {
    backgroundColor: 'lightgreen',
  },
});

class TeamSelectionDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    props.players.forEach(player => {
      this.state[player.id] = false;
    });

    this.togglePlayer = this.togglePlayer.bind(this);
    this.isInTeam = this.isInTeam.bind(this);
    this.maxPlayersReached = this.maxPlayersReached.bind(this);
  }

  togglePlayer(playerId) {
    return () => this.setState({ [playerId]: !this.state[playerId] });
  }

  isInTeam(playerId) {
    return this.state[playerId];
  }

  maxPlayersReached() {
    return (
      Object.values(this.state).filter(inTeam => inTeam).length ===
      this.props.maxTeamSize
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Dialog className={classes.root} open={this.props.open}>
        {/* TODO: localize */}
        <DialogTitle>Choose a team</DialogTitle>
        <List>
          {this.props.players.map(player => (
            <ListItem
              button
              className={this.isInTeam(player.id) ? classes.selected : ''}
              disabled={this.maxPlayersReached() && !this.isInTeam(player.id)}
              key={player.id}
              onClick={this.togglePlayer(player.id)}
            >
              <Player
                id={player.id}
                inTeam={this.isInTeam(player.id)}
                isLeader={false}
                name={player.name}
                role={player.role}
              />
            </ListItem>
          ))}
        </List>
        <DialogActions>
          <Button>Accept</Button>
          <Button>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

TeamSelectionDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  readOnly: PropTypes.bool.isRequired,
  players: PropTypes.array.isRequired,
  maxTeamSize: PropTypes.number.isRequired,
};

export default withStyles(style)(TeamSelectionDialog);
