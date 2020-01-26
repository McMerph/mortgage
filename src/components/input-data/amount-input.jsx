import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
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
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const MIN = 1;
const MAX = 100 * 1000 * 1000;

function AmountInput({ amount, setAmount }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        label="Amount"
        error={!amount.valid}
        helperText={
          amount.valid ? null : `Should be integer in range: [${MIN}, ${MAX}]`
        }
        value={amount.value}
        onChange={event => {
          const { value } = event.target;
          setAmount({
            value,
            valid: isValidInt(value, { min: MIN, max: MAX }),
          });
        }}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </div>
  );
}

AmountInput.propTypes = {
  amount: PropTypes.exact({
    value: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
  }).isRequired,
  setAmount: PropTypes.func.isRequired,
};

export default AmountInput;
