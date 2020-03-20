import React from 'react';

const AmortizationTable = ({ amortization = {} }) => {
    return (
        <div>
            {/* <p>monthlyPayment: {amortization.monthlyPayment}</p>
            <p>sortType: {amortization.sortType}</p>
            {amortization.loans ? amortization.loans.map((loan) => <p key={loan.id}>{loan.name}</p>) : <p>no loans</p>} */}


            <table>
                <thead>
                    <tr>
                        <th>month</th>
                        {amortization.loans ? amortization.loans.map(loan => <th key={loan.id}>{loan.name}</th>) : <td />}
                    </tr>
                </thead>
                <tbody>
                    {amortization.table ? amortization.table.map((loan, index) => {
                        return (<tr key={index + 'a'}>
                            <td key={index + ''}>{index}</td>
                            {Object.keys(loan).map(key => <td key={key + 'b'}>{loan[key].remainingBalance}</td>)}
                        </tr>);
                    }) : <td />}
                </tbody>
            </table>
        </div>
    )
};

export default AmortizationTable;