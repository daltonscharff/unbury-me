import React, { useReducer, useState, useEffect } from 'react';
import './App.css';
import LoanList from './components/LoanList';
import PaymentConfig from './components/PaymentConfig';
import LoansReducer from './reducers/LoansReducer';

function App() {
  const [loans, loansDispatch] = useReducer(LoansReducer, [
    {
      name: 'ELFI',
      amount: 60714.20,
      apr: 4.05,
      minPayment: 684.01
    }, {
      name: 'b',
      amount: 1000,
      apr: 2,
      minPayment: 100
    }
  ]);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [minPayment, setMinPayment] = useState(0);
  const [maxPayment, setMaxPayment] = useState(0);
  const [planType, setPlanType] = useState('avalanche');

  useEffect(() => {
    setMinPayment(loans.reduce((total, loan) => total + loan.minPayment, 0));
    setMaxPayment(loans.reduce((total, loan) => total + loan.amount, 0));
  }, [loans, setMinPayment, setMaxPayment]);

  return (
    <>
      <PaymentConfig
        minPayment={minPayment}
        maxPayment={maxPayment}
        monthlyPayment={monthlyPayment}
        setMonthlyPayment={setMonthlyPayment}
        planType={planType}
        setPlanType={setPlanType}
      />
      <LoanList loans={loans} dispatch={loansDispatch} />
    </>
  )
}

export default App;
