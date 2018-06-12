import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import strings from '../localization/game-locale';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
  },
  tokenArea: {
    marginBottom: theme.spacing.unit * -0.5,
    marginLeft: theme.spacing.unit,
  },
});

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false,
      isLeader: false,
      inTeam: false,
    };

    this.getInitials = this.getInitials.bind(this);
  }

  getInitials() {
    return this.props.name.substring(0, 2);
  }

  handleTooltipClose() {
    this.setState({ showTooltip: false });
  }

  handleTooltipOpen() {
    this.setState({ showTooltip: true });
  }

  toggleTooltip() {
    this.setState(prevState => {
      return { showTooltip: !prevState.showTooltip };
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item>
            <div className={classes.tokenArea}>
              {this.state.inTeam && <Icon>star_border</Icon>}
              {this.state.isLeader && <Icon>group</Icon>}
            </div>
            <Tooltip
              onClose={this.handleTooltipClose}
              onOpen={this.handleTooltipOpen}
              open={this.state.showTooltip}
              title={strings.roles[this.props.role]}
            >
              <Chip
                avatar={<Avatar>{this.getInitials()}</Avatar>}
                label={this.props.name}
                onClick={this.toggleTooltip}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Player.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default withStyles(styles)(Player);
