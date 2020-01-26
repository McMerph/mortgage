const MONTS_NUMBER_IN_YEAR = 12;

const getMonthlyPay = ({ amount, durationInMonths, monthlyRate }) => {
  const tmp = (1 + monthlyRate) ** durationInMonths;
  return Math.ceil((amount * monthlyRate * tmp) / (tmp - 1));
};

const calculateMortgage = ({
  durationInYears,
  annualPercentageRate,
  amount,
}) => {
  const durationInMonths = durationInYears * MONTS_NUMBER_IN_YEAR;
  const monthlyRate = annualPercentageRate / 100 / MONTS_NUMBER_IN_YEAR;
  const monthlyPay = getMonthlyPay({ amount, durationInMonths, monthlyRate });
  const byMonths = new Array(durationInMonths)
    .fill(null)
    .reduce((accumulator, unused, i) => {
      const remainderAtStart = i === 0 ? amount : accumulator[i - 1].remainder;
      const percentagePay = Math.ceil(remainderAtStart * monthlyRate);
      const pay = {
        percentage: percentagePay,
        main: monthlyPay - percentagePay,
      };
      let remainderAtEnd = remainderAtStart - pay.main;
      if (remainderAtEnd < 0) {
        pay.main += remainderAtEnd;
        remainderAtEnd = 0;
      }

      return accumulator.concat({
        remainder: remainderAtEnd,
        pay,
      });
    }, []);
  if (byMonths[byMonths.length - 1].remainder > 0) {
    byMonths[byMonths.length - 1].pay.percentage +=
      byMonths[byMonths.length - 1].remainder;
    byMonths[byMonths.length - 1].remainder = 0;
  }

  return {
    byMonths,
    overpayment:
      byMonths.reduce(
        (accumulator, { pay }) => accumulator + pay.main + pay.percentage,
        0
      ) - amount,
  };
};

export default calculateMortgage;
