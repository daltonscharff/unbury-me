import React, { useReducer, useState } from 'react';
import uuid from 'uuid/v4';
import './App.css';
import LoanList from './components/LoanList';
import PaymentConfig from './components/PaymentConfig';
import LoansReducer from './reducers/LoansReducer';
import InfoPanel from './components/InfoPanel';
import AmortizationTable from './components/AmortizationTable';

const App = () => {
  const [loans, loansDispatch] = useReducer(LoansReducer, [
    {
      id: uuid(),
      name: 'Test1',
      principle: 40000,
      interestRate: .04,
      minimumPayment: 450
    }, {
      id: uuid(),
      name: 'Test2',
      principle: 20000,
      interestRate: .07,
      minimumPayment: 550
    }
  ]);
  const minimumMonthlyPayment = loans.reduce((total, { minimumPayment }) => total + minimumPayment, 0);
  const totalPrinciple = loans.reduce((total, { principle }) => total + principle, 0);
  const averageInterestRate = loans.reduce((total, { interestRate, principle }) => total + ((interestRate) * (principle / totalPrinciple)), 0);

  const [monthlyPayment, setMonthlyPayment] = useState(minimumMonthlyPayment);
  const [planType, setPlanType] = useState('avalanche');
  const sortType = {
    avalanche: (a, b) => {
      if (a.interestRate > b.interestRate) return -1;
      if (b.interestRate > a.interestRate) return 1;
      return 0;
    },
    snowball: (a, b) => {
      if (a.principle < b.principle) return -1;
      if (b.principle < a.principle) return -1;
      return 0;
    }
  };

  const sortedLoans = [...loans].sort(sortType[planType]);

  return (
    <>
      <PaymentConfig
        monthlyPayment={monthlyPayment}
        setMonthlyPayment={setMonthlyPayment}
        planType={planType}
        setPlanType={setPlanType}
        minimumPayment={minimumMonthlyPayment}
        maximumPayment={totalPrinciple}
      />
      <LoanList loans={loans} dispatch={loansDispatch} />
      <InfoPanel loans={loans} monthlyPayment={monthlyPayment} />
      <AmortizationTable tables={createAmortizationTable(sortedLoans, monthlyPayment)} />
    </>
  )
}

class Loan {
  constructor(name, principle, interestRate, minimumPayment) {
    this.id = uuid();
    this.name = name;
    this.principle = principle;
    this.interestRate = interestRate;
    this.minimumPayment = minimumPayment;
    this.balance = principle;
  }

  getPayoffBalance() {
    return this.balance + this.balance * this.interestRate / 12;
  }





}

const createAmortizationTable = (loans, monthlyPayment) => {

  let tables = loans.map(({ id, principle }) => ({
    id,
    months: [{
      payment: 0,
      interestPaid: 0,
      principlePaid: 0,
      remaining: principle
    }]
  }));

  return tables;

  // while (tables.reduce((totalRemainingBalance, { remainingBalance }) => totalRemainingBalance + remainingBalance, 0)) {
  //   let remainingMonthlyPayment = monthlyPayment;
  //   for (let i in loans) {
  //     const aTable = tables[i];
  //     const aLoan = loans[i];

  //     if (aTable.remainingBalance >= aLoan.minimumPayment) {
  //       remainingMonthlyPayment -= aLoan.minimumPayment;
  //       aTable.months.push({
  //         payment: aLoan.minimumPayment
  //       });
  //     } else {
  //       remainingMonthlyPayment -= aTable.remainingBalance;
  //       aTable.months.push({
  //         payment: aTable.remainingBalance
  //       });
  //     }
  //   }
  //   for (let i in loans) {
  //     const aTable = tables[i];
  //     const aLoan = loans[i];

  //     if (aTable.remainingBalance >= remainingMonthlyPayment) {

  //     }
  //   }

  //   break;
  // }





  return [{
    id: 123,
    remainingBalance: 0,
    months: [{
      payment: 0,
      interestPaid: 0,
      principlePaid: 0,
      remaining: 1000
    }, {
      payment: 500,
      interestPaid: 5.83,
      principlePaid: 494.17,
      remaining: 505.83
    }, {
      payment: 500,
      interestPaid: 2.95,
      principlePaid: 497.05,
      remaining: 8.78
    }, {
      payment: 8.84,
      interestPaid: .05,
      principlePaid: 8.79,
      remaining: 0
    }]
  }];

};

export default App;
