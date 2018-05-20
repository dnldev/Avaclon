import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    height: 100,
    width: 100
  },
  circle: {
    stroke: theme.palette.secondary.dark,
    cx: 50,
    cy: 50,
    r: 40,
    strokeWidth: 3
  },
  currentMissionCircle: {
    stroke: theme.palette.primary.dark
  },
  goodWinCircleFill: {
    fill: theme.palette.teams.good
  },
  evilWinCircleFill: {
    fill: theme.palette.teams.evil
  },
  neutralCircleFill: {
    fill: "transparent"
  }
});

class Mission extends Component {
  isCurrentMission() {
    return this.props.missionIndex === this.props.currentMission;
  }

  getCircleClasses(classes) {
    return [
      classes.circle,
      this.isCurrentMission() ? classes.currentMissionCircle : '',
      this.getMissionStatusClass(classes)
    ].join(" ");
  }

  getMissionStatusClass(classes) {
    return this.props.wonBy === undefined ? classes.neutralCircleFill 
           : this.props.wonBy === "evil" ? classes.evilWinCircleFill : classes.goodWinCircleFill
  }

  render() {
    const { classes } = this.props;

    return (
      <svg className={classes.root}>
        <circle className={this.getCircleClasses(classes)} />
        <text fontSize="2em" x="50%" y="50%" text-anchor="middle" dy=".33em">
          {this.props.playersOnMission}
        </text>
      </svg>
    );
  }
}

Mission.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mission);
