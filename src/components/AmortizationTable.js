import React from 'react';

const AmortizationTable = ({ tables }) => {
    const exampleTables = [{
        id: 123,
        remainingBalance: 0,
        months: [{
            payment: 0,
            interestPaid: 0,
            principlePaid: 0,
            remaining: 1000
        }, {
            payment: 500,
            interestPaid: 5.83,
            principlePaid: 494.17,
            remaining: 505.83
        }, {
            payment: 500,
            interestPaid: 2.95,
            principlePaid: 497.05,
            remaining: 8.78
        }, {
            payment: 8.84,
            interestPaid: .05,
            principlePaid: 8.79,
            remaining: 0
        }]
    }];


    return (
        <div className='card table'>
            <table>
                <thead>
                    <tr>
                        <td>Month</td>
                        <td>Payment</td>
                        <td>Interest Paid</td>
                        <td>Principle Paid</td>
                        <td>Remaining</td>
                    </tr>
                </thead>
                <tbody>
                    {tables[0].months.map(({ payment, interestPaid, principlePaid, remaining }, i) => (
                        <tr key={i}>
                            <td>{i ? i : '-'}</td>
                            <td>{payment ? payment : '-'}</td>
                            <td>{interestPaid ? interestPaid : '-'}</td>
                            <td>{principlePaid ? principlePaid : '-'}</td>
                            <td>{remaining}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default AmortizationTable;