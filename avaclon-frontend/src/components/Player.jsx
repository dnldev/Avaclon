import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    bottom: theme.spacing.unit * 2,
    position: "fixed",
    left: "35%",
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
    height: "120%",
  }
});

class Player extends Component {
  render() {
    const { classes } = this.props;
    const { role } = this.props.player;

    return (
      <Paper className={classes.root}>
        <Grid container className={classes.playerControls}>
          <Grid item xs={9} className={classes.playerData}>
            <Typography className={classes.playerName} component="h3">
              {this.props.player.name}
            </Typography>
            <Divider />
            <div className={classes.playerControls}>
              <div className="buttonArea">
                <Button className={classes.voteButton}>Approve</Button>
                <Button className={classes.voteButton}>Reject</Button>
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
  player: PropTypes.object.isRequired,
};

export default withStyles(styles)(Player);
