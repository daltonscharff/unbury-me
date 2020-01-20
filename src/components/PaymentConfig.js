import React from 'react';

const PaymentConfig = ({ minPayment = 1, maxPayment, monthlyPayment = 0, setMonthlyPayment, planType = 'avalanche', setPlanType }) => {

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
                <p>${monthlyPayment}</p>
                <input type='range' min={minPayment} max={maxPayment} value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} />
            </div>
        </div>
    );
};

export default PaymentConfig;