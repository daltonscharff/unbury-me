import React from 'react';
import numeral from 'numeral';
import moment from 'moment';

const InfoPanel = ({ loans, monthlyPayment }) => {

    const totalPrinciple = loans.reduce((total, loan) => total + loan.principle, 0);
    const averageInterestRate = loans.reduce((total, loan) => total + ((loan.interestRate) * (loan.principle / totalPrinciple)), 0);
    const numOfPayments = Math.log((-12 * monthlyPayment) / (averageInterestRate * totalPrinciple - 12 * monthlyPayment)) / Math.log(1 + averageInterestRate / 12);

    const totalInterest_avalanche = loans.reduce((accruedInterest, loan) => {
        let remainingPrinciple = loan.principle;
        let count = 0
        while (remainingPrinciple > 0) {
            const interest = (loan.interestRate / (12 * 100)) * remainingPrinciple;
            accruedInterest += interest;
            remainingPrinciple -= (monthlyPayment - interest);
            count++;
            if (count > 500) {
                return -1;
            }
        }
        return accruedInterest;
    }, 0);
    const totalInterest_snowball = 0;

    return (
        <div className='card infoPanel'>
            <InfoBox
                title={'Principle Paid'}
                primary={numeral(totalPrinciple).format('$0,0.00')}
                secondary={'Total across all loans'}
                color='rgb(156, 39, 176)'
            />
            <InfoBox
                title={'Payoff Date'}
                primary={moment().add(numOfPayments, 'months').format('MMMM YYYY')}
                secondary={`Debt free in ${Math.ceil(numOfPayments)} months`}
                color='rgb(0, 191, 165)'
            />
            <InfoBox
                title={'Interest Paid'}
                primary={numeral(totalInterest_avalanche).format('$0,0.00')}
                secondary={'That\'s _% of your principle'}
                color='rgb(255, 87, 34)'
            />
            <InfoBox
                title={'Average Interest'}
                primary={numeral(averageInterestRate).format('0.0[00]%')}
                secondary={'Average interest rate across all loans'}
                color='rgb(255, 193, 7)'
            />
        </div>
    )
};

const InfoBox = ({ title, primary, secondary, color = '#123456' }) => (
    <div className='infoBox' style={{ background: color }}>
        <h1 className='infoBox--text-title'>{title}</h1>
        <h2 className='infoBox--text-primary'>{primary}</h2>
        <p className='infoBox--text-secondary'>{secondary}</p>
    </div >
);

export { InfoPanel as default, InfoBox };