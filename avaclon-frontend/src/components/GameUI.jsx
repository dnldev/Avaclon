import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import { BackendContext } from './context';

import AutoCollapsing from './AutoCollapsing';
import Board from './Board';
import PlayerView from './PlayerView';
import UserTerminal from './UserTerminal';

import TeamSelectionDialog from './TeamSelectionDialog';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  button: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  mainGrid: {
    [theme.breakpoints.up('md')]: {
      alignContent: 'space-between',
      height: '100%',
    },
  },
  toggleTerminalButton: {
    bottom: theme.spacing.unit,
    height: theme.spacing.unit * 4,
    position: 'fixed',
    width: 'calc(100% - ' + theme.spacing.unit * 2 + 'px)',
  },
  userTerminalArea: {
    marginTop: theme.spacing.unit * 2,
  },
});

class GameUI extends Component {
  userInTeam(id, teamIds) {
    return teamIds.indexOf(id) >= 0;
  }

  render() {
    const { classes } = this.props;

    return (
      <BackendContext.Consumer>
        {context => {
          return (
            <Grid container className={classes.mainGrid} justify="center">
              <Grid item lg={8} md={9} sm={11} xs={12}>
                <PlayerView
                  leaderId={context.leaderId}
                  players={context.players}
                  teamIds={context.teamIds}
                />
              </Grid>

              <Grid item lg={6} md={8} sm={10} xs={12}>
                <Board />
              </Grid>

              <Grid
                item
                className={classes.userTerminalArea}
                lg={8}
                md={9}
                xs={12}
              >
                <AutoCollapsing>
                  <UserTerminal
                    inTeam={this.userInTeam(context.player.id, context.teamIds)}
                    isLeader={context.player.id === context.leaderId}
                    player={context.player}
                  />
                </AutoCollapsing>
              </Grid>
              <TeamSelectionDialog
                // TODO: needs max player
                maxTeamSize={2}
                onClose={value => {
                  // TODO: Handle Cancel
                  value && context.selectTeam(value);
                }}
                open={context.selectingTeam}
                players={context.players.concat([context.player])}
                readOnly={true}
                title="Choose a team"
              />
            </Grid>
          );
        }}
      </BackendContext.Consumer>
    );
  }
}

GameUI.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameUI);
