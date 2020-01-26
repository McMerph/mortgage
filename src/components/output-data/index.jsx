import { DateTime } from 'luxon';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import calculateMortgage from '../../domain/calculate-mortgage';

const OutputData = ({ durationInYears, annualPercentageRate, amount }) => {
  const { byMonths, overpayment } = calculateMortgage({
    durationInYears,
    annualPercentageRate,
    amount,
  });
  const since = DateTime.local().startOf('month');

  return (
    <>
      <p>{`Overpayment is ${new Intl.NumberFormat().format(overpayment)}`}</p>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="result">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">Entire pay</TableCell>
              <TableCell align="right">Percentage pay</TableCell>
              <TableCell align="right">Main pay</TableCell>
              <TableCell align="right">Remainder</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {byMonths.map((row, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {since
                    .plus({ months: i })
                    .toLocaleString({ year: 'numeric', month: 'long' })}
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat().format(
                    row.pay.main + row.pay.percentage
                  )}
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat().format(row.pay.percentage)}
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat().format(row.pay.main)}
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat().format(row.remainder)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

OutputData.propTypes = {
  durationInYears: PropTypes.number.isRequired,
  annualPercentageRate: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
};

export default OutputData;
