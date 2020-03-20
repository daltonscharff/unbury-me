import React, { useReducer, useEffect, useState } from 'react';
import './App.css';
import AmortizationReducer from './reducers/AmortizationReducer';
import LoansReducer from './reducers/LoansReducer';
import PaymentPlan from './components/PaymentPlan';
import MyLoans from './components/MyLoans';
import InformationPanel from './components/InformationPanel';
import AmortizationTable from './components/AmortizationTable';

const App = () => {
    const [loans, loansDispatch] = useReducer(LoansReducer, []);
    const [paymentPlanType, setPaymentPlanType] = useState('avalanche');
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [amortization, amortizationDispatch] = useReducer(AmortizationReducer, {
        loans,
        monthlyPayment,
        sortType: paymentPlanType,
        table: []
    });

    useEffect(() => {
        loansDispatch({
            type: 'add_loan',
            name: 'Lowest Principle',
            principle: 500,
            interestRate: .02,
            minimumPayment: 200
        });
        loansDispatch({
            type: 'add_loan',
            name: 'Highest Interest Rate',
            principle: 1000,
            interestRate: .03,
            minimumPayment: 250
        });
        loansDispatch({
            type: 'add_loan',
            name: 'Middle',
            principle: 900,
            interestRate: .025,
            minimumPayment: 225
        });
    }, []);

    useEffect(() => {
        console.log('set_loans');
        amortizationDispatch({ type: 'set_loans', loans });
    }, [loans]);

    useEffect(() => {
        console.log('set_sort_type');
        amortizationDispatch({ type: 'set_sort_type', sortType: paymentPlanType });
    }, [paymentPlanType]);

    useEffect(() => {
        console.log('set_monthly_payment', monthlyPayment);
        amortizationDispatch({ type: 'set_monthly_payment', monthlyPayment });
    }, [monthlyPayment]);

    return (
        <>
            <PaymentPlan
                loans={loans}
                paymentPlanType={paymentPlanType}
                setPaymentPlanType={setPaymentPlanType}
                monthlyPayment={monthlyPayment}
                setMonthlyPayment={setMonthlyPayment}
            />
            <MyLoans loans={loans} dispatch={loansDispatch} />
            <InformationPanel loans={loans} monthlyPayment={monthlyPayment} />
            <AmortizationTable amortization={amortization} />
        </>
    )
}

export default App;
