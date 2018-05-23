import React, { Component } from "react"
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Chip, Avatar, Icon } from "@material-ui/core";

const styles = theme => ({
    root: {
        margin: theme.spacing.unit,
    },
    tokenArea: {
        height: "3%",
        marginBottom: theme.spacing.unit * -0.5,
        marginLeft: theme.spacing.unit,
    },
});

class Player extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLeader: true,
            inTeam: false
        }
    }

    showInfo(infoObject) {
        console.log(infoObject);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.tokenArea}>
                    {this.state.inTeam && <Icon>star_border</Icon>}
                    {this.state.isLeader && <Icon>group</Icon>}
                </div>
                <Chip
                    avatar={<Avatar>{this.props.playerInfo.name.substring(0, 2)}</Avatar>}
                    label={this.props.playerInfo.name}
                    onClick={() => this.showInfo(this.props.playerInfo.known)}
                />
            </div>
        );
    }
}

Player.propTypes = {
    classes: PropTypes.object.isRequired,
    playerInfo: PropTypes.object.isRequired
};

export default withStyles(styles)(Player)