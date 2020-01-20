import React from 'react';
import LoanListItem from './LoanListItem';

const LoanList = ({ loans, dispatch }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <LoanListItem dispatch={dispatch} empty={true} />
            {loans.map((loan, i) => <LoanListItem key={i} loan={loan} i={i} dispatch={dispatch} />)}

        </form>
    );
};

export default LoanList;