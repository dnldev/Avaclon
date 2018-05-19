import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    height: 100,
    width: 100
  }
});

class Mission extends Component {
  render() {
    const { classes } = this.props;

    return (
      <svg className={classes.root}>
        <circle cx="50" cy="50" r="40" stroke={ this.props.missionIndex === this.props.currentMission ? "red" : "black" } strokeWidth="3" 
                fill={this.props.wonBy === undefined ? "transparent" : this.props.wonBy === "evil" ? "red" : "blue"}/>
        <text fontSize="2em" x="50%" y="50%" textAnchor="middle" dy=".33em">
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
