import React from 'react';
import numeral from 'numeral';

const LoanList = ({ loans, dispatch }) => {
    return (
        <div className='card w2'>
            <div className='card--title'>
                <h1>My Loans</h1>
            </div>
            <div className='card--body'>
                {loans.map((loan, i) => <LoanListItem key={i} loan={loan} i={i} dispatch={dispatch} />)}
            </div>
        </div>
    );
};

const LoanListItem = ({ loan, i, dispatch }) => {

    return (
        <div className='loan'>
            <div className='loan--body-left'>
                <h2 className='loan--name'>
                    {loan.name}
                </h2>
                <p className='loan--info'>
                    {numeral(loan.principle).format('$0,0.00')} at {numeral(loan.interestRate).format('0.0[00]%')}
                </p>
            </div>
            <div className='loan--body-right'>

            </div>
        </div>
    );
};

export default LoanList;