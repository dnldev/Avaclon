import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Mission from "./Mission";

// Should be moved to its own library
import openSocket from "socket.io-client";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  })
});

class Board extends Component {
  missionsPlayerDict = {5: [2, 3, 2, 3, 3], 6: [2, 3, 4, 3, 4], 7: [2, 3, 3, 4, 4], 8: [3, 4, 4, 5, 5], 
                        9: [3, 4, 4, 5, 5], 10: [3, 4, 4, 5, 5]};

  constructor(props) {
    super(props);

    this.state = {
      currentMission: 0,
      voteMarker: 0,
      missionsWon: []
    };
  }

  missionWon(winner) {
    this.setState(prevState => {
      return { 
        currentMission: prevState.currentMission + 1,
        missionWon: prevState.missionsWon.push(winner)
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={10}>
        <Typography component="p">
            Current Mission: {this.state.currentMission}
          </Typography>

        {this.missionsPlayerDict[this.props.playerCount].map((missionPlayers, i) => {
          return (<Mission key={i} currentMission={this.state.currentMission} missionIndex={i}
                  playersOnMission={missionPlayers} wonBy={this.state.missionsWon[i]}/>)
        })}
        <br/>
        <Button size="small" className={classes.button} onClick={() => this.missionWon("evil")}>
          redWin
        </Button>
        <Button size="small" className={classes.button} onClick={() => this.missionWon("good")}>
          blueWin
        </Button>
      </Paper>
    );
  }
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Board);
