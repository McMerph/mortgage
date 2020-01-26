import React from 'react';
import PropTypes from 'prop-types';
import AmountInput from './amount-input';
import DurationInput from './duration-input';
import AnnualPercentageRateInput from './annual-percentage-rate';

function InputData({
  amount,
  setAmount,
  durationInYears,
  setDurationInYears,
  annualPercentageRate,
  setAnnualPercentageRate,
}) {
  return (
    <>
      <AmountInput amount={amount} setAmount={setAmount} />
      <DurationInput
        duration={durationInYears}
        setDuration={setDurationInYears}
      />
      <AnnualPercentageRateInput
        rate={annualPercentageRate}
        setRate={setAnnualPercentageRate}
      />
    </>
  );
}

const validatableType = PropTypes.exact({
  value: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
});
InputData.propTypes = {
  amount: validatableType.isRequired,
  setAmount: PropTypes.func.isRequired,
  durationInYears: validatableType.isRequired,
  setDurationInYears: PropTypes.func.isRequired,
  annualPercentageRate: validatableType.isRequired,
  setAnnualPercentageRate: PropTypes.func.isRequired,
};

export default InputData;
