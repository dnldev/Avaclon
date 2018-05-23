import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider, Grid, Icon } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import genblue from "./../static/genblue.JPG";
import genred from "./../static/genred.JPG";

const images = {
  genblue: genblue,
  genred: genred
};

const styles = theme => ({
  root: {
    bottom: theme.spacing.unit * 2,
    position: "absolute",
    width: "95%",
    [theme.breakpoints.between("md", "xl")]: {
      marginLeft: "20%",
      width: "50%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginLeft: "10%",
      width: "75%",
    },
  },
  evilPlayer: {
    textDecorationColor: theme.palette.teams.evil,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  goodPlayer: {
    textDecorationColor: theme.palette.teams.good,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  iconArea: {
    paddingTop: theme.spacing.unit,
  },
  namePaper: {
    marginBottom: 5,
    marginTop: 20,
    textAlign: "center",
  },
  playerControls: {
    padding: theme.spacing.unit,
  },
  playerName: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
  },
  roleImage: {
    borderRadius: 25,
    marginBottom: 0,
    width: "100%",
  },
  roleName: {
    marginBottom: 5,
    opacity: "0.7",
  },
  voteButton: {
    width: "50%",
  },
});

class UserTerminal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inTeam: true,
      isLeader: true,
    };

    this.sendVote = this.sendVote.bind(this);
    this.getPlayerNameClass = this.getPlayerNameClass.bind(this);
  }

  sendVote(vote) {
    // TODO: emit event
    // TODO: visual presentation for successful vote
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
      <Grid container className={classes.root} alignItems="flex-end">
        <Grid item xs={9}>
          <Paper className={classes.namePaper} elevation={2}>
            <Grid container>
              <Grid item xs={2} className={classes.iconArea}>
                {this.state.isLeader && <Icon>star_border</Icon>}
                {this.state.inTeam && <Icon>group</Icon>}
              </Grid>
              <Grid item xs={8}>
                <Typography className={headerClasses} variant="headline" component="h3">
                  {this.props.player.name}
                </Typography>
              </Grid>
            </Grid>
            <Typography className={classes.roleName} variant="subheading" component="p">
              {role.name}
            </Typography>
            <Divider />
            <div className={classes.playerControls}>
              <Button className={classes.voteButton} onClick={this.sendVote("Approve")}>
                Approve
                </Button>
              <Button className={classes.voteButton} onClick={this.sendVote("Reject")}>
                Reject
                </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          {/* // TODO: hide image (show backside) on click; show on hover */}
          <img className={classes.roleImage} src={images[role.image]} alt={role.name} />
        </Grid>
      </Grid>
    );
  }
}

UserTerminal.propTypes = {
  classes: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default withStyles(styles)(UserTerminal);
