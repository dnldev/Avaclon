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

import { BackendContext } from './context';

const styles = theme => ({
  root: {
    paddingTop: 2 * theme.spacing.unit,
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
});

const [HAMMER_INDEX, MISSION_FAIL_INDEX] = [3, 4];

class VoteStepper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hammerOpen: false,
      missionLossOpen: false,
    };

    this.handleHammerClose = this.handleHammerClose.bind(this);
    this.handleHammerOpen = this.handleHammerOpen.bind(this);
    this.handleMissionLossClose = this.handleMissionLossClose.bind(this);
    this.handleMissionLossOpen = this.handleMissionLossOpen.bind(this);
    this.toggleHammerOpen = this.toggleHammerOpen.bind(this);
    this.toggleMissionLossOpen = this.toggleMissionLossOpen.bind(this);
  }

  getMissionLossIcon = voteTracker => (
    <Tooltip
      enterDelay={300}
      id="tooltip-controlled"
      leaveDelay={300}
      open={this.state.missionLossOpen}
      placement="bottom"
      title={strings.voteTrackEnd}
      onClose={this.handleMissionLossClose}
      onOpen={this.handleMissionLossOpen}
    >
      <IconButton
        className={this.props.classes.iconButton}
        onClick={this.toggleMissionLossOpen}
      >
        <Icon
          className={this.props.classes.icon}
          color={voteTracker >= HAMMER_INDEX ? 'error' : 'secondary'}
        >
          error_outline
        </Icon>
      </IconButton>
    </Tooltip>
  );

  getHammerIcon = voteTracker => (
    <Tooltip
      enterDelay={300}
      id="tooltip-controlled"
      leaveDelay={300}
      open={this.state.hammerOpen}
      placement="bottom"
      title={strings.hammer}
      onClose={this.handleHammerClose}
      onOpen={this.handleHammerOpen}
    >
      <IconButton
        className={this.props.classes.iconButton}
        onClick={this.toggleHammerOpen}
      >
        <Icon
          className={this.props.classes.icon}
          color={
            voteTracker >= HAMMER_INDEX
              ? 'primary'
              : 'secondary'
          }
        >
          gavel
        </Icon>
      </IconButton>
    </Tooltip>
  );

  handleHammerClose() {
    this.setState({ hammerOpen: false });
  }

  handleHammerOpen() {
    this.setState({ hammerOpen: true });
  }

  handleMissionLossClose() {
    this.setState({ missionLossOpen: false });
  }

  handleMissionLossOpen() {
    this.setState({ missionLossOpen: true });
  }

  toggleHammerOpen() {
    this.setState(prevState => ({ hammerOpen: !prevState.hammerOpen }));
  }

  toggleMissionLossOpen() {
    this.setState(prevState => ({
      missionLossOpen: !prevState.missionLossOpen,
    }));
  }

  getStepLabelProperties = (index, voteTracker) => {
    if (index !== HAMMER_INDEX && index !== MISSION_FAIL_INDEX) return {};

    const { classes } = this.props;

    console.log('vote-tracker: ', voteTracker);

    return {
      className: classes.dottedLine,
      icon:
        index === HAMMER_INDEX
          ? this.getHammerIcon(voteTracker)
          : this.getMissionLossIcon(voteTracker),
    };
  };

  render() {
    const { classes } = this.props;

    return (
      <BackendContext.Consumer>
        {context => (
          // TODO: add stepper config so past steps aren't checked
          <Stepper className={classes.root} activeStep={context.voteTracker}>
            {this.props.voteTrackerLabels.map((label, index) => (
              <Step key={index}>
                <StepLabel
                  key={index}
                  error={index < context.voteTracker}
                  {...this.getStepLabelProperties(index, context.voteTracker)}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </BackendContext.Consumer>
    );
  }
}

VoteStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  voteTrackerLabels: PropTypes.array,
};

VoteStepper.defaultProps = {
  voteTrackerLabels: ['', '', '', '', ''],
};

export default withStyles(styles)(VoteStepper);
