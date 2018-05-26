import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import strings from "../localization/game-locale";

import genblue from "./../static/genblue.JPG";
import genred from "./../static/genred.JPG";
import backside from "./../static/backside.JPG";

const images = {
  backside: backside,
  genblue: genblue,
  genred: genred,
};

const styles = theme => ({
  root: {
    
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
      hideRole: true,
      inTeam: true,
      isLeader: true,
    };

    this.getPlayerNameClass = this.getPlayerNameClass.bind(this);
    this.toggleRoleConcealment = this.toggleRoleConcealment.bind(this);
    this.sendVote = this.sendVote.bind(this);
  }
  
  getPlayerNameClass(classes) {
    return this.props.player.role.affiliation === "evil"
      ? classes.evilPlayer
      : classes.goodPlayer;
  }

  toggleRoleConcealment() {
    this.setState((prevState) => {
      return {hideRole: !prevState.hideRole};
    });
  }
  
  sendVote(vote) {
    // TODO: emit event
    // TODO: visual presentation for successful vote
  }

  render() {
    const { classes } = this.props;
    const { role } = this.props.player;

    return (
      <Grid container className={classes.root} alignItems="flex-end">
        <Grid item xs={9} lg={10}>
          <Paper className={classes.namePaper} elevation={2}>
            <Grid container>
              <Grid item xs={2} className={classes.iconArea}>
                {this.state.isLeader && <Icon>star_border</Icon>}
                {this.state.inTeam && <Icon>group</Icon>}
              </Grid>
              <Grid item xs={8}>
                <Typography className={classes.playerName} variant="headline" component="h3">
                  {this.props.player.name}
                </Typography>
              </Grid>
            </Grid>
            <Typography 
              className={classes.roleName} 
              component="p"
              variant="subheading"
            >
              {!this.state.hideRole ? role.name : strings.roles.hidden}
            </Typography>
            
            <Divider />
            <div className={classes.playerControls}>
              <Button className={classes.voteButton} onClick={this.sendVote("Approve")}>
                {strings.mission.approve}
              </Button>
              <Button className={classes.voteButton} onClick={this.sendVote("Reject")}>
                {strings.mission.reject}
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3} lg={2}>
          <div 
            className={classes.imageContainer} 
            onClick={() => this.toggleRoleConcealment()}
          >
            <img 
              className={classes.roleImage}
              
              src={!this.state.hideRole ? images[role.image] : images['backside']} 
              alt={role.name} 
            />
          </div>
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
