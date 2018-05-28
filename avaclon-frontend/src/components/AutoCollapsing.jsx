import React, { Component } from "react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { SwipeableDrawer } from "@material-ui/core";

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

class AutoCollapsing extends Component {

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
          <Button {...this.props.ButtonProps}>
            <Icon>expand_more</Icon>
          </Button>
          <SwipeableDrawer anchor={this.props.anchor} SlideProps={this.props.SlideProps}>
            {children}
          </SwipeableDrawer>
        </Hidden>
      </div>);
  }
}

AutoCollapsing.propTypes = {
  breakAt: PropTypes.string.isRequired,
}

AutoCollapsing.defaultProps = {
  breakAt: "sm",
  ButtonProps: {
    color: "secondary",
    varian: "raised",
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

export default AutoCollapsing;
