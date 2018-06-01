import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {},
  svgRoot: {
    height: 100,
    width: 100,
  },
  circle: {
    stroke: theme.palette.secondary.dark,
    cx: 50,
    cy: 50,
    r: 40,
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
      : this.props.wonBy === 'evil'
        ? classes.evilWinCircleFill
        : classes.goodWinCircleFill;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <svg className={classes.svgRoot}>
          <circle className={this.getCircleClasses(classes)} />
          <text className={classes.questText} dy=".33em" x="50" y="50">
            {this.props.playersOnQuest}
          </text>
        </svg>
      </div>
    );
  }
}

Quest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Quest);
