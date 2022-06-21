import ResultBox from './ResultBox';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const testPLNToUSD = [
  { amount: 20, result: 'PLN 20.00 = $5.71' },
  { amount: 180, result: 'PLN 180.00 = $51.43' },
  { amount: 341, result: 'PLN 341.00 = $97.43' },
  { amount: 500, result: 'PLN 500.00 = $142.86' },
];

const testUSDToPLN = [
  { amount: 20, result: '$20.00 = PLN 70.00' },
  { amount: 180, result: '$180.00 = PLN 630.00' },
  { amount: 341, result: '$341.00 = PLN 1,193.50' },
  { amount: 500, result: '$500.00 = PLN 1,750.00' },
];

const testUSDToUSD = [
  { amount: 20, result: '$20.00 = $20.00' },
  { amount: 180, result: '$180.00 = $180.00' },
  { amount: 341, result: '$341.00 = $341.00' },
  { amount: 500, result: '$500.00 = $500.00' },
];


describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
  for (let testPLN of testPLNToUSD) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={testPLN.amount} />);

      //find container of ResultBox component
      const resultBox = screen.getByTestId('result-box');

      //check if container of ResultBox have correct value 
      expect(resultBox).toHaveTextContent(testPLN.result);
    });
  };
  for (let testUSD of testUSDToPLN) {
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={testUSD.amount} />);

      //find container of ResultBox component
      const resultBox = screen.getByTestId('result-box');

      //check if container of ResultBox have correct value 
      expect(resultBox).toHaveTextContent(testUSD.result);
    });
  };
  for (let testUSDOnly of testUSDToUSD) {
    it('should render proper info about conversion when USD -> USD', () => {
      render(<ResultBox from="USD" to="USD" amount={testUSDOnly.amount} />);

      //find container of ResultBox component
      const resultBox = screen.getByTestId('result-box');

      //check if container of ResultBox have correct value 
      expect(resultBox).toHaveTextContent(testUSDOnly.result);
    });
  };
  it('shoud render "Wrong value" when amount is minus', () => {
    render(<ResultBox from='USD' to="PLN" amount={-100} />);

    //find container of ResultBox component
    const resultBox = screen.getByTestId('result-box');

    //check if container of ResultBox have correct value 
    expect(resultBox).toHaveTextContent("-$100.00 = Wrong value");
  })

});