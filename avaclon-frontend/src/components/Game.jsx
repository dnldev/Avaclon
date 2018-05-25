import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
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
  toggleTerminalButton: {
    bottom: theme.spacing.unit,
    height: theme.spacing.unit * 4,
    position: "fixed",
    width: "calc(100% - " + theme.spacing.unit * 2 + "px)",
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
    const player = {
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
        marginBottom: 8,
        marginLeft: 16,
      },
    };

    if (!this.state.loading) {
      return (
        <div className={classes.root}>
          <GameContext.Provider value={this.state}>
            {this.state.isAdmin ? <AdminArea /> : <UserControlArea />}

            <Board />
            <Hidden only={['xs', 'sm', 'md']}>
              <UserTerminal player={player} />
            </Hidden>
            <Hidden only={['lg', 'xl']}>
              <Button 
                className={classes.toggleTerminalButton}
                color="secondary"
                onClick={() => this.toggleUserTerminal(true)}
                variant="raised"
              >
                <Icon>expand_more</Icon>
              </Button>
              <SwipeableDrawer
                anchor="bottom"
                onClose={() => this.toggleUserTerminal(false)}
                onOpen={() => this.toggleUserTerminal(true)}
                open={this.state.terminalOpen}
                SlideProps={transparentSlideProps}
              >
                <UserTerminal player={player} />
              </SwipeableDrawer>
            </Hidden>
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
