import React, { useReducer, useEffect } from 'react';
import './App.css';
import LoansReducer from './reducers/LoansReducer';
import Loan from './components/Loan';

const App = () => {
  const [loans, loansDispatch] = useReducer(LoansReducer, []);

  useEffect(() => console.log(loans), [loans]);

  const createNewLoan = () => {
    if (loansDispatch) {
      loansDispatch({
        type: 'create'
      })
    }
  };

  return (
    <div>
      <button onClick={createNewLoan}>Add a loan</button>

      {loans.map((loan) => {
        return <Loan key={loan.id} loan={loan} dispatch={loansDispatch} />
      })}
    </div>
  )
}

export default App;
