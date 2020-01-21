import React, { useState, useEffect } from 'react';
import numeral from 'numeral';

const PaymentConfig = ({ loans = [], monthlyPayment, setMonthlyPayment }) => {
    const [minPayment, setMinPayment] = useState(0);
    const [maxPayment, setMaxPayment] = useState(0);
    const [planType, setPlanType] = useState('avalanche');

    const handlePlanChange = (e) => setPlanType(e.target.value);

    useEffect(() => {
        setMinPayment(loans.reduce((total, loan) => total + loan.minPayment, 0));
        setMaxPayment(loans.reduce((total, loan) => total + loan.amount, 0));
        setMonthlyPayment(minPayment);
    }, [loans, setMinPayment, setMaxPayment, setMonthlyPayment, minPayment]);


    return (
        <div className='card w1'>
            <div className='card--title'>
                <h1>Payment Plan</h1>
            </div>
            <div className='card--body'>

                <h2>Payment Plan Type</h2>
                <label>
                    <input type='radio' name='plan-type' value='avalanche' checked={planType === 'avalanche'} onChange={handlePlanChange} />
                    Highest Interest Rate (Avalanche)
                </label>
                <br />
                <label>
                    <input type='radio' name='plan-type' value='snowball' checked={planType === 'snowball'} onChange={handlePlanChange} />
                    Lowest Principal (Snowball)
                </label>
                <br />
                <hr />

                <h2>Monthly Payment</h2>
                <p className='bold green'>{numeral(monthlyPayment).format('$0,0.00')}</p>
                <input type='range' min={minPayment} max={maxPayment / 12} value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} />
            </div>
        </div>
    );
};

export default PaymentConfig;