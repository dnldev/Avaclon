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
});

class TeamSelectionDialog extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Dialog className={classes.root} open={this.props.open}>
        {/* TODO: localize */}
        <DialogTitle>Choose a team</DialogTitle>
        <List>
          {this.props.players.map(player => (
            <ListItem button={!this.props.readOnly} key={player.id}>
              <Player
                id={player.id}
                name={player.name}
                role={player.role}
                isLeader={false}
                inTeam={false}
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
};

export default withStyles(style)(TeamSelectionDialog);
