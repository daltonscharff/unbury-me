import React, { useReducer, useEffect, useState } from 'react';
import './App.css';
import LoansReducer from './reducers/LoansReducer';
import AmortizationReducer from './reducers/AmortizationReducer';
import PaymentPlan from './components/PaymentPlan';
import MyLoans from './components/MyLoans';
import InformationPanel from './components/InformationPanel';
import AmortizationTable from './components/AmortizationTable';
// import LoanList from './classes/LoanList';

const App = () => {
    const [loans, loansDispatch] = useReducer(LoansReducer);
    const [amortization, amortizationDispatch] = useReducer(AmortizationReducer);
    const [paymentPlanType, setPaymentPlanType] = useState('avalanche');
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    // const [amortization, amortizationDispatch] = useReducer(AmortizationReducer, new LoanList());

    useEffect(() => {
        loansDispatch({
            type: 'add',
            name: 'A',
            principle: 123,
            interestRate: .01,
            minimumPayment: 10
        });
        loansDispatch({
            type: 'add',
            name: 'B',
            principle: 345,
            interestRate: .02,
            minimumPayment: 20
        });
        amortizationDispatch({
            type: 'update',
            loans,
            monthlyPayment,
            paymentPlanType
        });
    }, []);

    useEffect(() => {
        console.log(loans);
    });

    useEffect(() => {

    });

    // useEffect(() => {
    //     console.log('set_loans');
    //     amortizationDispatch({ type: 'set_loans', loans });
    // }, [loans]);

    // useEffect(() => {
    //     console.log('set_sort_type');
    //     amortizationDispatch({ type: 'set_sort_type', sortType: paymentPlanType });
    // }, [paymentPlanType]);

    // useEffect(() => {
    //     console.log('set_monthly_payment', monthlyPayment);
    //     amortizationDispatch({ type: 'set_monthly_payment', monthlyPayment });
    // }, [monthlyPayment]);

    return (
        <>
            {/* <PaymentPlan
                loans={loans}
                paymentPlanType={paymentPlanType}
                setPaymentPlanType={setPaymentPlanType}
                monthlyPayment={monthlyPayment}
                setMonthlyPayment={setMonthlyPayment}
            />
            <MyLoans loans={loans} dispatch={loansDispatch} />
            <InformationPanel loans={loans} monthlyPayment={monthlyPayment} />
            <AmortizationTable amortization={amortization} /> */}
        </>
    )
}

export default App;
