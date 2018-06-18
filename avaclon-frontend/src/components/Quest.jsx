import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Affiliation from 'avalon-models/Affiliation';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {},
  svgRoot: {
    height: 100,
    width: 100,
  },
  circle: {
    stroke: theme.palette.secondary.dark,
    strokeWidth: 3,
  },
  currentQuestCircle: {
    stroke: theme.palette.primary.dark,
  },
  goodWinCircleFill: {
    fill: theme.palette.teams.good,
  },
  evilWinCircleFill: {
    fill: theme.palette.teams.evil,
  },
  neutralCircleFill: {
    fill: 'transparent',
  },
  questText: {
    fontSize: '2em',
    textAnchor: 'middle',
    userSelect: 'none',
  },
});

class Quest extends Component {
  isCurrentQuest() {
    return this.props.questIndex === this.props.currentQuest;
  }

  getCircleClasses(classes) {
    return [
      classes.circle,
      this.isCurrentQuest() ? classes.currentQuestCircle : '',
      this.getQuestStatusClass(classes),
    ].join(' ');
  }

  getQuestStatusClass(classes) {
    return this.props.wonBy === undefined
      ? classes.neutralCircleFill
      : this.props.wonBy === Affiliation.EVIL
        ? classes.evilWinCircleFill
        : classes.goodWinCircleFill;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <svg className={classes.svgRoot}>
          <circle
            className={this.getCircleClasses(classes)}
            cx={50}
            cy={50}
            r={40}
          />
          {this.props.wonBy === undefined && (
            <text className={classes.questText} dy=".33em" x="50" y="50">
              {this.props.playersOnQuest}
            </text>
          )}
        </svg>
      </div>
    );
  }
}

Quest.propTypes = {
  classes: PropTypes.object.isRequired,
  currentQuest: PropTypes.number.isRequired,
  playersOnQuest: PropTypes.number.isRequired,
  questIndex: PropTypes.number.isRequired,
  wonBy: PropTypes.number,
};

export default withStyles(styles)(Quest);
