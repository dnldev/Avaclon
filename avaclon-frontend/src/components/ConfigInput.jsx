import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import strings from '../localization/game-locale';

import { BackendContext } from './context';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
  },
  gridItemContent: {
    width: '90%',
  },
  grid: {
    padding: theme.spacing.unit * 2,
  },
});

class ConfigInput extends Component {
  state = {
    name: '',
  };

  render() {
    const { classes } = this.props;

    return (
      <BackendContext.Consumer>
        {context => {
          return (
            <Grid container className={classes.grid}>
              <Grid item xs={12} md={4}>
                <TextField
                  className={classes.gridItemContent}
                  label={strings.name}
                  name="username"
                  onChange={context.handleChange}
                  value={context.username}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl className={classes.gridItemContent}>
                  <InputLabel htmlFor="player-count">
                    {strings.playerCount}
                  </InputLabel>
                  <Select
                    inputProps={{ name: 'playerCount', id: 'player-count' }}
                    onChange={context.handleChange}
                    value={context.playerCount}
                  >
                    <MenuItem value={5}>{strings.numbers.five}</MenuItem>
                    <MenuItem value={6}>{strings.numbers.six}</MenuItem>
                    <MenuItem value={7}>{strings.numbers.seven}</MenuItem>
                    <MenuItem value={8}>{strings.numbers.eight}</MenuItem>
                    <MenuItem value={9}>{strings.numbers.nine}</MenuItem>
                    <MenuItem value={10}>{strings.numbers.ten}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          );
        }}
      </BackendContext.Consumer>
    );
  }
}

ConfigInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfigInput);