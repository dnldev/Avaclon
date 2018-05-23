import React, { Component } from "react"
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Chip, Avatar } from "@material-ui/core";

const styles = theme => ({
    root: {
        margin: theme.spacing.unit,
    },
    tokenArea: {
        margin: theme.spacing.unit,
    },
});

class Player extends Component {

    showInfo() {

    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Chip
                    avatar={<Avatar>PL</Avatar>}
                    label="Player"
                    onClick={this.showInfo}
                />
                <div className={classes.tokenArea}>
                    
                </div>
            </div>
        );
    }
}

Player.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Player)