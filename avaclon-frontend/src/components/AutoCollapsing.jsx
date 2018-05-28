import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Drawer from "@material-ui/core/Drawer";

const styles = theme => ({
  root: {},
  toggleButton: {
    bottom: theme.spacing.unit,
    position: "fixed",
    width: "calc(100% - " + theme.spacing.unit * 2 + "px)",
  },
});

class AutoCollapsing extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggleContent = this.toggleContent.bind(this);
  }

  /** 
   * return 2 arrays indicating the screen sizes
   * for which sizes to collapse and for which to expand  .
   */
  computeRequiredSizes(screenSize) {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    // position of screen size in array (relative to other sizes)
    const breakPosition = sizes.indexOf(screenSize) + 1;
    const collapsed = sizes.slice(0, breakPosition);
    const full = sizes.slice(breakPosition, sizes.length);
    return { collapsedSizes: collapsed, fullSizes: full };
  }

  toggleContent(isOpen) {
    this.setState({ isOpen: isOpen });
  }

  render() {
    const { classes } = this.props;

    const { collapsedSizes, fullSizes } = this.computeRequiredSizes(this.props.breakFrom);

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
            <Icon>expand_less</Icon>
          </Button>
          <Drawer
            anchor={this.props.anchor}
            SlideProps={this.props.SlideProps}
            open={this.state.isOpen}
            onClose={() => this.toggleContent(false)}
          >
            {children}
          </Drawer>
        </Hidden>
      </div>);
  }
}

AutoCollapsing.propTypes = {
  breakFrom: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

AutoCollapsing.defaultProps = {
  breakFrom: "sm",
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
