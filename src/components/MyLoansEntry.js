import React, { useState } from 'react';

const MyLoansEntry = ({ loan = {}, dispatch }) => {
    const [id, setId] = useState(loan.id);
    const [name, setName] = useState(loan.name);
    const [principle, setPrinciple] = useState(loan.principle);
    const [interestRate, setInterestRate] = useState(loan.interestRate);
    const [minimumPayment, setMinimumPayment] = useState(loan.minimumPayment);

    return (
        <div>
            <label>
                id:
                <input type='text' value={id || ''} onChange={(e) => setId(e.target.value)} readOnly disabled />
            </label>
            <br />
            <label>
                name:
                <input type='text' value={name || ''} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
                principle:
                <input type='number' value={principle || 0} onChange={(e) => setPrinciple(e.target.value)} />
            </label>
            <br />
            <label>
                interestRate:
                <input type='number' value={interestRate || 0} onChange={(e) => setInterestRate(e.target.value)} />
            </label>
            <br />
            <label>
                minimumPayment:
                <input type='number' value={minimumPayment || 0} onChange={(e) => setMinimumPayment(e.target.value)} />
            </label>
            <br />
            <button onClick={() => {
                dispatch({
                    type: 'update',
                    id,
                    name,
                    principle,
                    interestRate,
                    minimumPayment
                });
            }}>Save</button>
            <button onClick={() => {
                dispatch({
                    type: 'delete',
                    id
                });
            }}>Delete</button>
        </div>
    );
}

export default MyLoansEntry;