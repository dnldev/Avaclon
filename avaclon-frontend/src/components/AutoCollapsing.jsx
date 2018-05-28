import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const styles = theme => ({
  root: { width: "100%" },
  toggleButton: {
    bottom: theme.spacing.unit,
    position: "fixed",
    width: "calc(100% - " + theme.spacing.unit * 2 + "px)",
  },
});

class AutoCollapsing extends PureComponent {

  sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggleContent = this.toggleContent.bind(this);
  }

  toggleContent(isOpen) {
    this.setState({ isOpen: isOpen });
  }

  render() {
    const { classes } = this.props;

    const breakPosition = sizes.indexOf(this.props.breakAt) + 1;
    const collapsedSizes = sizes.slice(0, breakPosition);
    const fullSizes = sizes.slice(breakPosition, sizes.length);

    const children = this.props.children;

    return (
      <div className={classes.root}>
        <Hidden only={collapsedSizes}>
          {children}
        </Hidden>
        <Hidden only={fullSizes}>
          <Button
            className={classes.toggleButton}
            {...this.props.ButtonProps}
            onClick={() => this.toggleContent(true)}
          >
            <Icon>expand_more</Icon>
          </Button>
          <SwipeableDrawer
            anchor={this.props.anchor}
            SlideProps={this.props.SlideProps}
            open={this.state.isOpen}
            onOpen={() => this.toggleContent(true)}
            onClose={() => this.toggleContent(false)}
          >
            {children}
          </SwipeableDrawer>
        </Hidden>
      </div>);
  }
}

AutoCollapsing.propTypes = {
  breakAt: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

AutoCollapsing.defaultProps = {
  breakAt: "sm",
  ButtonProps: {
    color: "secondary",
    variant: "raised",
  },
  SlideProps: {
    elevation: 0,
    style: {
      backgroundColor: "transparent",
      margin: 8,
    },
  },
  anchor: "bottom",
}

export default withStyles(styles)(AutoCollapsing);
