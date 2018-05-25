import React, { Component } from "react"
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";

import strings from "../localization/game-locale"

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
      isLeader: true,
      inTeam: true,
    }

    this.getInitials = this.getInitials.bind(this);
  }

  getInitials() {
    return this.props.name.substring(0, 2);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.tokenArea}>
          {this.state.inTeam && <Icon>star_border</Icon>}
          {this.state.isLeader && <Icon>group</Icon>}
        </div>
        <Tooltip title={strings.roles[this.props.role]}>
          <Chip
            avatar={<Avatar>{this.getInitials()}</Avatar>}
            label={this.props.name}
          />
        </Tooltip>
      </div>
    );
  }
}

Player.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.object.isRequired,
};

export default withStyles(styles)(Player)