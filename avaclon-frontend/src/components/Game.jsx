import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Icon from "@material-ui/core/Icon";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import strings from "../localization/game-locale";

import GameContext from "./game-context";

import UserTerminal from "./UserTerminal";

import AdminArea from "./AdminArea";
import Board from "./Board";
import UserControlArea from "./UserControlArea";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  button: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  mainGrid: {
    height: "calc(100vh - 48px - " + theme.spacing.unit * 2 + "px)",
    alignContent: "stretch",
    [theme.breakpoints.up("md")]: {
      alignContent: "space-between",
    },
    [theme.breakpoints.up("sm")]: {
      height: "calc(100vh - 64px - " + theme.spacing.unit * 2 + "px)",
    }
  },
  toggleTerminalButton: {
    bottom: theme.spacing.unit,
    height: theme.spacing.unit * 4,
    position: "fixed",
    width: "calc(100% - " + theme.spacing.unit * 2 + "px)",
  },
  userTerminalArea: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Game extends Component {
  currentLanguage = "en";

  constructor(props) {
    super(props);

    this.state = {  // TODO: get state init values from socket.io
      currentMission: 0,
      gameEnded: false,
      playerCount: 10,
      voteMarker: 0,
      wonMissions: [],
    };

    this.state.isAdmin = true;
    this.state.loading = false;
    this.state.terminalOpen = false;

    this.state.switchLanguage = this.switchLanguage.bind(this);

    this.switchLanguage = this.switchLanguage.bind(this);
    this.toggleUserTerminal = this.toggleUserTerminal.bind(this);
  }

  getClonedObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

  switchLanguage() {
    this.currentLanguage = this.currentLanguage === "en" ? "de" : "en";
    strings.setLanguage(this.currentLanguage);
    this.setState({});
  }

  toggleUserTerminal(open) {
    this.setState({ terminalOpen: open });
  }

  render() {
    const { classes } = this.props;
    const goodPlayer = {
      name: "Daniel",
      role: {
        affiliation: "good",
        image: "genblue",
        name: strings.roles.good,
      },
    };
    const evilPlayer = {
      name: "Josh",
      role: {
        affiliation: "evil",
        image: "genred",
        name: strings.roles.evil,
      },
    };

    const transparentSlideProps = {
      elevation: 0,
      style: {
        backgroundColor: "transparent", 
        margin: 8,
      },
    };

    const userTerminal = (<UserTerminal player={goodPlayer} />) 

    if (!this.state.loading) {
      return (
        <div className={classes.root}>
          <GameContext.Provider value={this.state}>
            <Grid 
              className={classes.mainGrid}  
              justify="center" 
              container
            >
              <Grid xs={12} item>
                {this.state.isAdmin ? <AdminArea /> : <UserControlArea />}
              </Grid>

              <Grid lg={6} md={8} sm={10} xs={12} item>
                <Board />
              </Grid>
              <Grid className={classes.userTerminalArea} md={6} lg={8} xs={12} item>
                <Hidden only={["xs", "sm"]}>
                  {userTerminal}
                </Hidden>
                <Hidden only={["md", "lg", "xl"]}>
                  <Button 
                    className={classes.toggleTerminalButton}
                    color="secondary"
                    onClick={() => this.toggleUserTerminal(true)}
                    variant="raised"
                  >
                    {this.state.terminalOpen ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
                  </Button>
                  <SwipeableDrawer
                    anchor="bottom"
                    onClose={() => this.toggleUserTerminal(false)}
                    onOpen={() => this.toggleUserTerminal(true)}
                    open={this.state.terminalOpen}
                    SlideProps={transparentSlideProps}
                  >
                    {userTerminal}
                  </SwipeableDrawer>
                </Hidden>
              </Grid>
            </Grid>
          </GameContext.Provider>
        </div>
      );
    }
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);
