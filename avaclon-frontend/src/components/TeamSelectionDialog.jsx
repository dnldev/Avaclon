import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

import strings from '../localization/game-locale';

const style = theme => ({
  root: {},
  controlButton: {
    marginRight: theme.spacing.unit * 2,
  },
  select: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
});

class TeamSelectionDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team: [this.props.playerId],
    };

    this.handleAccept = this.handleAccept.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isInTeam = this.isInTeam.bind(this);
    this.maxPlayersReached = this.maxPlayersReached.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  handleAccept() {
    this.props.onClose(this.state.team);
  }

  // handleCancel() {
  //   this.props.onClose(null);
  // }

  handleChange(event) {
    this.setState({ team: event.target.value });
  }

  isInTeam(playerId) {
    return this.state.team.indexOf(playerId) !== -1;
  }

  maxPlayersReached() {
    return this.state.team.length === this.props.maxTeamSize;
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      if (this.maxPlayersReached()) {
        this.handleAccept();
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        className={classes.root}
        open={this.props.open}
        PaperProps={{
          style: { width: '50%' },
        }}
      >
        {/* TODO: localize */}
        <DialogTitle>{strings.chooseTeam}</DialogTitle>
        <FormControl className={classes.select}>
          <InputLabel htmlFor="select-multiple-checkbox">Team</InputLabel>
          <Select
            multiple
            input={<Input id="select-multiple-checkbox" />}
            // Display selected names in Select
            renderValue={selected =>
              selected
                .map(
                  id => this.props.players.find(player => player.id === id).name
                )
                .join(', ')
            }
            value={this.state.team}
            onChange={this.handleChange}
          >
            {this.props.players.map(player => (
              <MenuItem
                disabled={this.maxPlayersReached() && !this.isInTeam(player.id)}
                key={player.id}
                value={player.id}
              >
                <Checkbox checked={this.isInTeam(player.id)} />
                <ListItemText primary={player.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DialogActions>
          <Button
            className={classes.controlButton}
            color="secondary"
            disabled={!this.maxPlayersReached()}
            variant="flat"
            onClick={this.handleAccept}
          >
            {strings.accept}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

TeamSelectionDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  maxTeamSize: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  playerId: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
};

export default withStyles(style)(TeamSelectionDialog);
