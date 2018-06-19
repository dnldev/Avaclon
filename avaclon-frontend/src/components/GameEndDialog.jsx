import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Affiliation from 'avalon-models/Affiliation';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import strings from '../localization/game-locale';

const style = theme => ({
  root: {},
  dialogPaper: {
    width: '80%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
  },
});

class VoteResultDialog extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        className={classes.root}
        open={this.props.open}
        onClose={this.props.onClose}
        PaperProps={{
          className: classes.dialogPaper,
        }}
      >
        <DialogTitle>
          {this.props.winner === Affiliation.EVIL
            ? strings.evilWon
            : strings.goodWon}
        </DialogTitle>
        <List>
          {Object.keys(this.props.playerRoles).map(name => (
            <ListItem key={name}>
              <strong>{name}:&nbsp;</strong>
              {this.props.playerRoles[name]}
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }
}

VoteResultDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  playerRoles: PropTypes.object.isRequired,
  winner: PropTypes.number.isRequired,
};

export default withStyles(style)(VoteResultDialog);
