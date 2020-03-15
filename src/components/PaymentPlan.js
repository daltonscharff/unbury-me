import React from 'react';
import numeral from 'numeral';

const PaymentPlan = ({ loans, paymentPlanType, setPaymentPlanType, monthlyPayment, setMonthlyPayment }) => {
    const minimumMonthlyPayment = loans.reduce((total, { minimumPayment }) => total + minimumPayment, 0);
    if (monthlyPayment < minimumMonthlyPayment) setMonthlyPayment(minimumMonthlyPayment);
    const maximumMonthlyPayment = loans.reduce((total, { principle }) => total + principle, 0);

    const handlePlanChange = (e) => setPaymentPlanType(e.target.value);

    return (
        <div className='card w1'>
            <div className='card--title'>
                <h1>Payment Plan</h1>
            </div>
            <div className='card--body'>

                <h2>Payment Plan Type</h2>
                <label>
                    <input type='radio' name='plan-type' value='avalanche' checked={paymentPlanType === 'avalanche'} onChange={handlePlanChange} />
                    Highest Interest Rate (Avalanche)
                </label>
                <br />
                <label>
                    <input type='radio' name='plan-type' value='snowball' checked={paymentPlanType === 'snowball'} onChange={handlePlanChange} />
                    Lowest Principal (Snowball)
                </label>
                <br />
                <hr />

                <h2>Monthly Payment</h2>
                <p className='bold green'>{numeral(monthlyPayment).format('$0,0.00')}</p>
                <input type='range' min={minimumMonthlyPayment || 0} max={maximumMonthlyPayment || 0} value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} />
            </div>
        </div>
    )
};

export default PaymentPlan;