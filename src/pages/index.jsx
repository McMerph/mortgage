import React, { useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputData from '../components/input-data';
import OutputData from '../components/output-data';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}));

const IndexPage = () => {
  const [amount, setAmount] = useState({ value: '500000', valid: true });
  const [durationInYears, setDurationInYears] = useState({
    value: '1',
    valid: true,
  });
  const [annualPercentageRate, setAnnualPercentageRate] = useState({
    value: '5',
    valid: true,
  });
  const valid = [amount, durationInYears, annualPercentageRate].every(
    v => v.valid
  );
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <InputData
          amount={amount}
          setAmount={setAmount}
          durationInYears={durationInYears}
          setDurationInYears={setDurationInYears}
          annualPercentageRate={annualPercentageRate}
          setAnnualPercentageRate={setAnnualPercentageRate}
        />
        {valid && (
          <OutputData
            durationInYears={Number.parseFloat(durationInYears.value)}
            annualPercentageRate={Number.parseFloat(annualPercentageRate.value)}
            amount={Number.parseFloat(amount.value)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default IndexPage;
