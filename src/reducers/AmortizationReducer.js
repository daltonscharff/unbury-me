const AmortizationReducer = (state, action) => {
    let newState = { ...state };
    switch (action.type.toLowerCase()) {
        case 'set_loans':
            newState.loans = [...action.loans];
            break;
        case 'set_sort_type':
            newState.sortType = action.sortType;
            break;
        case 'set_monthly_payment':
            newState.monthlyPayment = action.monthlyPayment;
            break;
        default:
            return new Error('Not a valid action type.');
    }
    newState.table = getTable(newState.loans, newState.monthlyPayment, newState.sortType);
    return newState;
};

const getTable = (loans, monthlyPayment, sortType) => {
    if (!loans || !monthlyPayment || !sortType) return [];

    const _dividePayment = (loans, monthlyPayment) => {
        let paymentPerLoan = loans.map((loan) => loan.minimumPayment);
        // let maximumPaymentPerLoan = loans.map((loan) => {
        //     let interest = Math.round(loan.remainingBalance * loan.interestRate);
        //     return loan.remainingBalance + interest;
        // });
        paymentPerLoan[0] += monthlyPayment - loans.reduce((total, loan) => total + loan.minimumPayment, 0);
        return paymentPerLoan;
    };

    const _getMonthlyRecord = (loanStatuses, paymentPerLoan) => {
        let monthlyRecord = {};
        loanStatuses.forEach((loan, index) => {
            const interest = Math.round(loan.remainingBalance * loan.interestRate);
            monthlyRecord[loan.id] = {
                remainingBalance: loan.remainingBalance + interest - paymentPerLoan[index],
                payment: {
                    total: paymentPerLoan[index],
                    toInterest: interest,
                    toPrinciple: paymentPerLoan[index] - interest
                }
            };
        });
        return monthlyRecord;
    };

    const _sort = (loans, type) => {
        const sortingAlgorithms = {
            avalanche: (a, b) => {
                if (a.interestRate > b.interestRate) return -1;
                if (b.interestRate > a.interestRate) return 1;
                return 0;
            },
            snowball: (a, b) => {
                if (a.principle < b.principle) return -1;
                if (b.principle < a.principle) return 1;
                return 0;
            }
        };
        return loans.sort(sortingAlgorithms[type]);
    };

    let table = [];
    let paymentPerLoan = _dividePayment(loans, monthlyPayment);
    let sortedLoans = _sort(loans, sortType);
    let loanStatuses = sortedLoans.map((loan) => ({
        id: loan.id,
        remainingBalance: loan.principle,
        interestRate: loan.interestRate
    }));

    while (loanStatuses.reduce((total, { remainingBalance }) => total + remainingBalance, 0) > 0) {
        let monthlyRecord = _getMonthlyRecord(loanStatuses, paymentPerLoan);
        table.push(monthlyRecord);

        loanStatuses.forEach((loan) => loan.remainingBalance = monthlyRecord[loan.id].remainingBalance);
        if (table.length > 5) break;
    }
    return table;
};

export { AmortizationReducer as default, getTable };
