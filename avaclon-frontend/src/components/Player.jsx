import React, { Component } from "react"
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Chip, Avatar, Icon, Tooltip } from "@material-ui/core";

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
      inTeam: true
    }
  }

  showInfo(infoObject) {
    console.log(infoObject);
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
            avatar={
              <Avatar>{this.props.name.substring(0, 2)}</Avatar>
            }
            label={this.props.name}
            onClick={() => this.showInfo(this.props.role)}
          />
        </Tooltip>
      </div>
    );
  }
}

Player.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Player)