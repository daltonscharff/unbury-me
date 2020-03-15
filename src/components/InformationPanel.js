import React from 'react';
import numeral from 'numeral';
import moment from 'moment';

const InformationPanel = ({ loans, monthlyPayment }) => {
    const totalPrinciple = loans.reduce((total, { principle }) => total + principle, 0);
    const averageInterestRate = loans.reduce((total, loan) => total + ((loan.interestRate) * (loan.principle / totalPrinciple)), 0);

    return (
        <div className='card infoPanel'>
            <Box
                title={'Principle Paid'}
                primary={numeral(totalPrinciple).format('$0,0.00')}
                secondary={'Total across all loans'}
                color='rgb(156, 39, 176)'
            />
            {/* <Box
                title={'Payoff Date'}
                primary={moment().add(numOfPayments, 'months').format('MMMM YYYY')}
                secondary={`Debt free in ${Math.ceil(numOfPayments)} months`}
                color='rgb(0, 191, 165)'
            /> */}
            {/* <Box
                title={'Interest Paid'}
                primary={numeral(totalInterest_avalanche).format('$0,0.00')}
                secondary={'That\'s _% of your principle'}
                color='rgb(255, 87, 34)'
            /> */}
            <Box
                title={'Average Interest'}
                primary={numeral(averageInterestRate).format('0.0[00]%')}
                secondary={'Average interest rate across all loans'}
                color='rgb(255, 193, 7)'
            />
        </div>
    );
};

const Box = ({ title, primary, secondary, color = '#123456' }) => (
    <div className='infoBox' style={{ background: color }}>
        <h1 className='infoBox--text-title'>{title}</h1>
        <h2 className='infoBox--text-primary'>{primary}</h2>
        <p className='infoBox--text-secondary'>{secondary}</p>
    </div >
);

export { InformationPanel as default, Box };