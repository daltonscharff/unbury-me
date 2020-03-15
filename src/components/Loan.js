import React, { useState } from 'react';

const Loan = ({ loan = {}, dispatch }) => {
    const [id, setId] = useState(loan.id);
    const [name, setName] = useState(loan.name);
    const [initialPrinciple, setInitialPrinciple] = useState(loan.initialPrinciple);

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
                <input type='number' value={initialPrinciple || 0} onChange={(e) => setInitialPrinciple(e.target.value)} />
            </label>
            <br />
            <button onClick={() => {
                dispatch({
                    type: 'update',
                    id,
                    name,
                    initialPrinciple
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

export default Loan;