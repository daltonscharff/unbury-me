import React, { useState, useEffect } from 'react';

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
                    ${loan.amount} at {loan.apr}%
                </p>
            </div>
            <div className='loan--body-right'>

            </div>
        </div>
    );
};

export default LoanList;