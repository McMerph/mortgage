import calculateMortgage from './calculate-mortgage';

describe('calculateMortgage()', () => {
  it('should calculate mortgage with small last pay', () => {
    const expectedByMonths = [
      [24433, 1250, 275567],
      [24534, 1149, 251033],
      [24637, 1046, 226396],
      [24739, 944, 201657],
      [24842, 841, 176815],
      [24946, 737, 151869],
      [25050, 633, 126819],
      [25154, 529, 101665],
      [25259, 424, 76406],
      [25364, 319, 51042],
      [25470, 213, 25572],
      [25572, 107, 0],
    ].map(v => ({ remainder: v[2], pay: { main: v[0], percentage: v[1] } }));

    const result = calculateMortgage({
      durationInYears: 1,
      annualPercentageRate: 5,
      amount: 300 * 1000,
    });

    expect(result).toEqual({ byMonths: expectedByMonths, overpayment: 8192 });
  });

  it('should calculate mortgage with big last pay', () => {
    const expectedByMonths = [
      [40720, 2084, 459280],
      [40890, 1914, 418390],
      [41060, 1744, 377330],
      [41231, 1573, 336099],
      [41403, 1401, 294696],
      [41576, 1228, 253120],
      [41749, 1055, 211371],
      [41923, 881, 169448],
      [42097, 707, 127351],
      [42273, 531, 85078],
      [42449, 355, 42629],
      [42626, 181, 0],
    ].map(v => ({ remainder: v[2], pay: { main: v[0], percentage: v[1] } }));

    const result = calculateMortgage({
      durationInYears: 1,
      annualPercentageRate: 5,
      amount: 500 * 1000,
    });

    expect(result).toEqual({ byMonths: expectedByMonths, overpayment: 13651 });
  });
});
