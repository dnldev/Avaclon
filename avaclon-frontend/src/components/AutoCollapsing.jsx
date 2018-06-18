import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {},
  toggleButton: {
    bottom: theme.spacing.unit,
    position: 'fixed',
    width: 'calc(100% - ' + theme.spacing.unit * 2 + 'px)',
  },
});

class AutoCollapsing extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.setOpen = this.setOpen.bind(this);
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

  setOpen(open) {
    this.setState({ isOpen: open });
  }

  render() {
    const { classes } = this.props;

    const { collapsedSizes, fullSizes } = this.computeRequiredSizes(
      this.props.breakFrom
    );

    const children = this.props.children;

    return (
      <div className={classes.root}>
        <Hidden only={collapsedSizes}>{children}</Hidden>
        <Hidden only={fullSizes}>
          <Button
            className={classes.toggleButton}
            {...this.props.ButtonProps}
            onClick={() => this.setOpen(true)}
          >
            <Icon>expand_less</Icon>
          </Button>
          <Drawer
            anchor={this.props.anchor}
            open={this.state.isOpen}
            SlideProps={this.props.SlideProps}
            onClose={() => this.setOpen(false)}
          >
            {children}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

AutoCollapsing.propTypes = {
  anchor: PropTypes.string,
  breakFrom: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  ButtonProps: PropTypes.object,
  SlideProps: PropTypes.object,
};

AutoCollapsing.defaultProps = {
  anchor: 'bottom',
  breakFrom: 'sm',
  ButtonProps: {
    color: 'secondary',
    variant: 'raised',
  },
  SlideProps: {
    elevation: 0,
    style: {
      backgroundColor: 'transparent',
      margin: 8,
    },
  },
};

export default withStyles(styles)(AutoCollapsing);
