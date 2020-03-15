import React from 'react';
import MyLoansEntry from './MyLoansEntry';

const MyLoans = ({ loans, dispatch }) => {
    const createNewLoan = () => {
        dispatch({ type: 'create' });
    };

    return (
        <div className='card w2'>
            <div className='card--title'>
                <h1>My Loans</h1>
                <button onClick={createNewLoan}>Add a loan</button>
            </div>
            <div className='card--body'>
                {loans.map((loan) => {
                    return <MyLoansEntry key={loan.id} loan={loan} dispatch={dispatch} />
                })}
            </div>
        </div>
    );
}

export default MyLoans;