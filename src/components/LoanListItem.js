import React, { useState, useEffect } from 'react';

const LoanListItem = ({ loan = {}, i, dispatch, empty = false }) => {
    const [name, setName] = useState(loan.name || '');
    const [amount, setAmount] = useState(loan.amount || '');
    const [apr, setApr] = useState(loan.apr || '');

    useEffect(() => {
        let action = { type: 'UPDATE_LOAN', name, amount, apr, i };
        dispatch(action);
    }, [name, amount, apr, i, dispatch]);

    const addButton = <button onClick={
        () => dispatch({
            type: 'ADD_LOAN',
            name,
            amount,
            apr
        })
    } autoFocus>Add</button>

    const removeButton = <button onClick={
        () => dispatch({
            type: 'REMOVE_LOAN',
            i
        })
    }>Remove</button>

    return (
        <div>
            <input name='name' placeholder='Loan Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input name='amount' placeholder='Amount Owed' value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input name='apr' placeholder='APR' value={apr} onChange={(e) => setApr(e.target.value)} />
            {empty ? addButton : removeButton}
        </div>
    );
};

export default LoanListItem;