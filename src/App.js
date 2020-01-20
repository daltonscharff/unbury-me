import React, { useReducer } from 'react';
import LoanList from './components/LoanList';
import PaymentConfig from './components/PaymentConfig';
import LoansReducer from './reducers/LoansReducer';

function App() {
  const [loans, loansDispatch] = useReducer(LoansReducer, []);

  return (
    <>
      <LoanList loans={loans} dispatch={loansDispatch} />
    </>
  )
}

export default App;
