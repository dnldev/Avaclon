import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    height: 100,
    width: 100,
  },
  circle: {
    stroke: theme.palette.secondary.dark,
    cx: 50,
    cy: 50,
    r: '11vw',
    strokeWidth: 3,
    [theme.breakpoints.up('sm')]: {
      r: '40',
    },
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
      <svg className={classes.root}>
        <circle className={this.getCircleClasses(classes)} />
        <text
          fontSize="2em"
          x="calc(50 - 10vw)"
          y="50%"
          textAnchor="middle"
          dy=".33em"
        >
          {this.props.playersOnQuest}
        </text>
      </svg>
    );
  }
}

Quest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Quest);
