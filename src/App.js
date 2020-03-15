import React, { useReducer, useEffect, useState } from 'react';
import './App.css';
import LoansReducer from './reducers/LoansReducer';
import PaymentPlan from './components/PaymentPlan';
import MyLoans from './components/MyLoans';
import InformationPanel from './components/InformationPanel';

const exampleLoans = [{
    id: '123',
    name: 'loan 1',
    principle: 1000,
    interestRate: .04,
    minimumPayment: 100
}, {
    id: 'abc',
    name: 'loan 2',
    principle: 500,
    interestRate: .02,
    minimumPayment: 40
}];

const App = () => {
    const [loans, loansDispatch] = useReducer(LoansReducer, [...exampleLoans]);
    const [paymentPlanType, setPaymentPlanType] = useState('avalanche');
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    useEffect(() => console.log(loans), [loans]);

    return (
        <div>
            <PaymentPlan
                loans={loans}
                paymentPlanType={paymentPlanType}
                setPaymentPlanType={setPaymentPlanType}
                monthlyPayment={monthlyPayment}
                setMonthlyPayment={setMonthlyPayment}
            />
            <MyLoans loans={loans} dispatch={loansDispatch} />
            <InformationPanel loans={loans} monthlyPayment={monthlyPayment} />
        </div>
    )
}

export default App;
