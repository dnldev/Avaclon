import React, { Component } from "react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

class AutoCollapsing extends Component {

  render() {
    const breakPosition = sizes.indexOf(this.props.breakAt) + 1;
    const collapsedSizes = sizes.slice(0, breakPosition);
    const fullSizes = sizes.slice(breakPosition, sizes.length);

    const children = this.props.children;

    return (
      <div>
        <Hidden only={collapsedSizes}>
          {children}
        </Hidden>
        <Hidden only={fullSizes}>
          <Button {...this.props.buttonProps}>
            <Icon>expand_more</Icon>
          </Button>
          {children}
        </Hidden>
      </div>);
  }
}

AutoCollapsing.propTypes = {
  breakAt: PropTypes.string.isRequired,
}

AutoCollapsing.defaultProps = {
  breakAt: "sm",
  buttonProps: {
    color: "secondary",
    varian: "raised",
  },
}

export default AutoCollapsing;
