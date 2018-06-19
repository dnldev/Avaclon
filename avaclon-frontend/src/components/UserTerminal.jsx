import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import strings from '../localization/game-locale';

import { GameContext } from './context';

import genblue from './../static/images/genblue.JPG';
import genred from './../static/images/genred.JPG';
import backside from './../static/images/backside.png';

const images = {
  backside: backside,
  genblue: genblue,
  genred: genred,
};

const styles = theme => ({
  root: {},
  evilPlayer: {
    textDecorationColor: theme.palette.teams.evil,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  goodPlayer: {
    textDecorationColor: theme.palette.teams.good,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  iconArea: {
    padding: 10,
  },
  leaderIcon: {
    borderBottom: '0.8px dotted ' + theme.palette.secondary.main,
  },
  namePaper: {
    marginBottom: 5,
    marginTop: 20,
    textAlign: 'center',
  },
  playerControls: {
    padding: theme.spacing.unit,
  },
  playerName: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  roleImage: {
    borderRadius: 15,
    cursor: 'pointer',
    marginBottom: 0,
    width: '100%',
  },
  roleName: {
    marginBottom: 5,
    opacity: '0.7',
  },
  voteButton: {
    width: '50%',
  },
});

class UserTerminal extends Component {
  constructor(props) {
    super(props);

    this.getPlayerNameClass = this.getPlayerNameClass.bind(this);
  }

  getPlayerNameClass(classes) {
    return this.props.player.role.affiliation === 'evil'
      ? classes.evilPlayer
      : classes.goodPlayer;
  }

  render() {
    const { classes } = this.props;
    const { role } = this.props.player;

    return (
      <GameContext.Consumer>
        {context => {
          return (
            <Grid container className={classes.root} alignItems="flex-end">
              <Grid item xs={8} md={9} lg={10}>
                <Paper className={classes.namePaper} elevation={2}>
                  <Grid container>
                    <Grid item className={classes.iconArea} xs={2}>
                      {this.props.isLeader && (
                        <IconButton onClick={this.props.toggleTeamDialog}>
                          <Icon className={classes.leaderIcon}>
                            star_border
                          </Icon>
                        </IconButton>
                      )}
                    </Grid>
                    <Grid item xs={8}>
                      <Typography
                        className={classes.playerName}
                        variant="headline"
                        component="h3"
                      >
                        {this.props.player.name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography
                    className={classes.roleName}
                    component="p"
                    variant="subheading"
                  >
                    {!context.hideRole ? role.name : strings.roles.hidden}
                  </Typography>

                  <Divider />
                  <div className={classes.playerControls}>
                    <Button
                      className={classes.voteButton}
                      disabled={!this.props.canVote}
                      variant={this.props.vote === true ? 'outlined' : 'text'}
                      onClick={() => this.props.sendVote(true)}
                    >
                      {strings.quest.approve}
                    </Button>
                    <Button
                      className={classes.voteButton}
                      disabled={!this.props.canVote}
                      variant={this.props.vote === false ? 'outlined' : 'text'}
                      onClick={() => this.props.sendVote(false)}
                    >
                      {strings.quest.reject}
                    </Button>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={4} md={3} lg={2}>
                <div
                  className={classes.imageContainer}
                  onClick={context.toggleRoleConcealment}
                >
                  <img
                    className={classes.roleImage}
                    src={
                      !context.hideRole
                        ? images[role.image]
                        : images['backside']
                    }
                    alt={!context.hideRole ? role.name : strings.backside}
                  />
                </div>
              </Grid>
            </Grid>
          );
        }}
      </GameContext.Consumer>
    );
  }
}

UserTerminal.propTypes = {
  classes: PropTypes.object.isRequired,
  canVote: PropTypes.bool.isRequired,
  isLeader: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired,
  sendVote: PropTypes.func.isRequired,
  toggleTeamDialog: PropTypes.func.isRequired,
  vote: PropTypes.bool,
};

UserTerminal.defaultProps = {
  vote: null,
};

export default withStyles(styles)(UserTerminal);
