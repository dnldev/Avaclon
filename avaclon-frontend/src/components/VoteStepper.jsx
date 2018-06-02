import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Tooltip from '@material-ui/core/Tooltip';

import strings from '../localization/game-locale';

import GameContext from './game-context';

const styles = theme => ({
  root: {
    paddingBottom: theme.spacing.unit,
  },
  icon: {
    borderBottom: '0.8px dotted ' + theme.palette.secondary.main,
    height: 24,
    width: 24,
  },
  iconButton: {
    height: 32,
    width: 32,
  },
  primaryFill: {
    fill: theme.palette.primary.main,
  },
  secondaryFill: {
    fill: theme.palette.secondary.main,
  },
  dottedLine: {
    [theme.breakpoints.down('md')]: {
      textDecorationStyle: 'dotted',
    },
  },
});

class VoteStepper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hammerOpen: false,
      missionLossOpen: false,
    };
  }

  getMissionLossIcon(voteMarker, classes) {
    const missionLossIcon = (
      <Tooltip
        enterDelay={300}
        id="tooltip-controlled"
        leaveDelay={300}
        onClose={this.handleMissionLossClose}
        onOpen={this.handleMissionLossOpen}
        open={this.state.missionLossOpen}
        placement="bottom"
        title={strings.voteTrackEnd}
      >
        <IconButton
          className={classes.iconButton}
          onClick={this.toggleMissionLossOpen}
        >
          <Icon
            className={classes.icon}
            color={4 !== voteMarker ? 'secondary' : 'error'}
          >
            highlight_off
          </Icon>
        </IconButton>
      </Tooltip>
    );

    return missionLossIcon;
  }

  getHammerIcon(voteMarker, classes) {
    const hammerIcon = (
      <Tooltip
        enterDelay={300}
        id="tooltip-controlled"
        leaveDelay={300}
        onClose={this.handleHammerClose}
        onOpen={this.handleHammerOpen}
        open={this.state.hammerOpen}
        placement="bottom"
        title={strings.hammer}
      >
        <IconButton
          className={classes.iconButton}
          onClick={this.toggleHammerOpen}
        >
          <svg className={classes.icon}>
            {/* Custom svg path that draws a Hammer Icon */}
            <path
              className={
                3 !== voteMarker ? classes.secondaryFill : classes.primaryFill
              }
              d="M16,5L19,8L18.5,8.5C19.5,9.5 20,10 20.5,9.5L22,11C22,12 20.5,13.5 19.5,13.5L18,12C18.5,11.5 18,11 17,10L16,11L13,8C14.5,6 13,4 9,5C10,4 11,3 12,3C12.5,3 14,3 16,5M2,20L4,22L14,12L12,10L2,20Z"
            />
          </svg>
        </IconButton>
      </Tooltip>
    );

    return hammerIcon;
  }

  handleHammerClose = () => {
    this.setState({ hammerOpen: false });
  };

  handleHammerOpen = () => {
    this.setState({ hammerOpen: true });
  };

  handleMissionLossClose = () => {
    this.setState({ missionLossOpen: false });
  };

  handleMissionLossOpen = () => {
    this.setState({ missionLossOpen: true });
  };

  toggleHammerOpen = () => {
    this.setState(prevState => {
      return { hammerOpen: !prevState.hammerOpen };
    });
  };

  toggleMissionLossOpen = () => {
    this.setState(prevState => {
      return { missionLossOpen: !prevState.missionLossOpen };
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <GameContext.Consumer>
        {context => {
          return (
            <Stepper
              nonLinear
              className={classes.root}
              activeStep={context.voteMarker}
            >
              {this.props.voteMarkerLabels.map((label, index) => {
                const props = {};

                if (index === 3 || index === 4) {
                  props.className = classes.dottedLine;
                }

                if (index === 3) {
                  props.icon = this.getHammerIcon(context.voteMarker, classes);
                } else if (index === 4) {
                  props.icon = this.getMissionLossIcon(
                    context.voteMarker,
                    classes
                  );
                }

                return (
                  <Step key={index}>
                    <StepLabel key={index} {...props}>
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          );
        }}
      </GameContext.Consumer>
    );
  }
}

VoteStepper.propTypes = {
  classes: PropTypes.object.isRequired,
};

VoteStepper.defaultProps = {
  voteMarkerLabels: ['', '', '', '', ''],
};

export default withStyles(styles)(VoteStepper);
