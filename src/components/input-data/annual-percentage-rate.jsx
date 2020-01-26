import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import isValidFloat from '../../utils/is-valid-float';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator=" "
      isNumericString
      suffix="%"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const MIN = 0.001;
const MAX = 100500;

function AnnualPercentageRateInput({ rate, setRate }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        label="Annual percentage rate"
        error={!rate.valid}
        helperText={rate.valid ? null : `Should be in range: [${MIN}, ${MAX}]`}
        value={rate.value}
        onChange={event => {
          const { value } = event.target;
          setRate({
            value,
            valid: isValidFloat(value, { min: MIN, max: MAX }),
          });
        }}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </div>
  );
}

AnnualPercentageRateInput.propTypes = {
  rate: PropTypes.exact({
    value: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
  }).isRequired,
  setRate: PropTypes.func.isRequired,
};

export default AnnualPercentageRateInput;
