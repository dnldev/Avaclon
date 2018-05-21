import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider, Grid, Icon } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    bottom: theme.spacing.unit * 2,
    left: "35%",
    position: "fixed",
    width: "30%"
  },
  playerName: {
    padding: theme.spacing.unit * 2,
    textAlign: "center"
  },
  playerControls: {
    padding: theme.spacing.unit
  },
  voteButton: {
    width: "50%"
  },
  playerData: {},
  cardImage: {
    height: "120%"
  },
  evilPlayer: {
    textDecorationColor: theme.palette.teams.evil,
    textDecorationLine: "underline",
    textDecorationStyle: "solid"
  },
  goodPlayer: {
    textDecorationColor: theme.palette.teams.good,
    textDecorationLine: "underline",
    textDecorationStyle: "solid"
  }
});

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inTeam: false,
      isLeader: false
    };

    this.sendVote = this.sendVote.bind(this);
    this.getPlayerNameClass = this.getPlayerNameClass.bind(this);
  }

  sendVote(vote) {
    // TODO: emit event
    // TODO: visual presentation for successfull vote
  }

  getPlayerNameClass(classes) {
    return this.props.player.role.affiliation === "evil"
      ? classes.evilPlayer
      : classes.goodPlayer;
  }

  render() {
    const { classes } = this.props;
    const { role } = this.props.player;
    const headerClasses = [
      classes.playerName,
      this.getPlayerNameClass(classes)
    ].join(" ");

    return (
      // TODO: better icons
      <Paper className={classes.root}>
        <Grid container className={classes.playerControls}>
          <Grid item xs={9} className={classes.playerData}>
            <Typography
              className={headerClasses}
              variant="headline"
              component="h3"
            >
              {this.props.player.name}
              {this.state.isLeader && <Icon>group_add</Icon>}
              {this.state.inTeam && <Icon>star</Icon>}
            </Typography>
            <Divider />
            <div className={classes.playerControls}>
              <div className="buttonArea">
                <Button
                  className={classes.voteButton}
                  onClick={this.sendVote("Approve")}
                >
                  Approve
                </Button>
                <Button
                  className={classes.voteButton}
                  onClick={this.sendVote("Reject")}
                >
                  Reject
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={3} className={classes.cardImage}>
            <img src={role.image} alt={role.name} />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

Player.propTypes = {
  classes: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default withStyles(styles)(Player);
