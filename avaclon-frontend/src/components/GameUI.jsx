import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import { BackendContext } from './context';

import strings from '../localization/game-locale';

import AutoCollapsing from './AutoCollapsing';
import Board from './Board';
import PlayerView from './PlayerView';
import QuestVoteDialog from './QuestVoteDialog';
import TeamSelectionDialog from './TeamSelectionDialog';
import UserTerminal from './UserTerminal';

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
                  playerId={context.player.id}
                  players={context.players}
                  teamIds={context.teamIds}
                />
              </Grid>

              <Grid item lg={6} md={8} sm={10} xs={12}>
                <Board
                  currentQuest={context.wonQuests.length}
                  playerCount={context.playerCount}
                  questPlayerCounts={context.questPlayerCounts}
                  wonQuests={context.wonQuests}
                />
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
                    canVote={context.teamProposed && !context.voteCast}
                    inTeam={this.userInTeam(context.player.id, context.teamIds)}
                    isLeader={context.player.id === context.leaderId}
                    player={context.player}
                    sendVote={context.sendVote}
                    vote={context.vote}
                  />
                </AutoCollapsing>
              </Grid>

              <QuestVoteDialog
                open={context.needsToVote}
                onClose={context.sendQuestVote}
              />
              <TeamSelectionDialog
                maxTeamSize={
                  context.questPlayerCounts[context.wonQuests.length]
                }
                open={context.selectingTeam}
                players={[context.player].concat(context.players)}
                readOnly={true}
                title={strings.chooseTeam}
                onClose={context.sendTeam}
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
