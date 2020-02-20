import React, { useState, useEffect } from 'react';
import numeral from 'numeral';

const PaymentConfig = ({ monthlyPayment, setMonthlyPayment, planType, setPlanType, minimumPayment, maximumPayment }) => {

    const handlePlanChange = (e) => setPlanType(e.target.value);

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
                <input type='range' min={minimumPayment} max={maximumPayment} value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} />
            </div>
        </div>
    );
};

export default PaymentConfig;