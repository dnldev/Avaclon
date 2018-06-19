import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import strings from '../localization/game-locale';

const style = () => ({
  root: {},
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
          style: {
            width: '50%',
          },
        }}
      >
        <List>
          {Object.keys(this.props.lastVoteResult).map(name => (
            <ListItem key={name}>
              <strong>{name}:&nbsp;</strong>
              {this.props.lastVoteResult[name]
                ? strings.quest.approve
                : strings.quest.reject}
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }
}

VoteResultDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  lastVoteResult: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(style)(VoteResultDialog);
