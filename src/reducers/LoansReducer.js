const uuid = require('uuid/v4');

class Loan {
    constructor(name, principle, interestRate, minimumPayment, id) {
        this.id = id || uuid();
        this.name = name;
        this.principle = principle;
        this.interestRate = interestRate;
        this.minimumPayment = minimumPayment;

        const interest = this.principle * this.interestRate;
        if (minimumPayment <= interest) {
            throw new Error(`Minimum payment cannot be below ${interest}.`);
        }
    }
}

class LoanList {
    constructor() {
        this.loans = [...arguments];
        this.totalPrinciple = this._getTotalPrinciple(this.loans);
        this.averageInterestRate = this._getAverageInterestRate(this.loans, this.totalPrinciple);
        this.minimumPayment = this._getMinimumPayment(this.loans);
    }

    _getTotalPrinciple(loans) {
        return loans.reduce((total, loan) => total + loan.principle, 0);
    }

    _getAverageInterestRate(loans, totalPrinciple) {
        return loans.reduce((total, loan) => {
            return total + (loan.interestRate * (loan.principle / totalPrinciple));
        }, 0);
    }

    _getMinimumPayment(loans) {
        return loans.reduce((total, loan) => total + loan.minimumPayment, 0);
    }
}

const LoansReducer = (state = new LoanList(), action) => {
    switch (action.type.toLowerCase()) {
        case 'add':
            return new LoanList(...state.loans, new Loan(
                action.name,
                action.principle,
                action.interestRate,
                action.minimumPayment
            ));
        case 'update':
            return new LoanList(...state.loans.map((loan) => {
                if (loan.id === action.id) {
                    return new Loan(
                        action.name || loan.name,
                        action.principle || loan.principle,
                        action.interestRate || loan.interestRate,
                        action.minimumPayment || loan.minimumPayment,
                        loan.id
                    );
                } else {
                    return loan;
                }
            }))
        case 'remove':
            return new LoanList(...state.loans.filter((loan) => loan.id !== action.id));
        default:
            return new Error('Not a valid action type.');
    };
};

export { LoansReducer as default, Loan, LoanList };