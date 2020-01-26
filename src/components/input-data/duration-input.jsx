import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import isValidInt from '../../utils/is-valid-int';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const MIN = 1;
const MAX = 50;

function DurationInput({ duration, setDuration }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        label="Duration in years"
        error={!duration.valid}
        helperText={
          duration.valid ? null : `Should be integer in range: [${MIN}, ${MAX}]`
        }
        value={duration.value}
        onChange={event => {
          const { value } = event.target;
          setDuration({
            value,
            valid: isValidInt(value, { min: MIN, max: MAX }),
          });
        }}
      />
    </div>
  );
}

DurationInput.propTypes = {
  duration: PropTypes.exact({
    value: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
  }).isRequired,
  setDuration: PropTypes.func.isRequired,
};

export default DurationInput;
