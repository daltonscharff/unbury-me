const Loan = require('./Loan');

export default class LoanList {
    constructor() {
        this.loans = [...arguments];
    }

    add(loan) {
        this.loans.push(loan);
    }

    remove(id) {
        this.loans = this.loans.filter((loan) => loan.id !== id);
    }

    copy() {
        return new LoanList(...this.loans.map((loan) => loan.copy()));
    }

    sort(type = 'avalanche') {
        const sortingAlgorithms = {
            avalanche: (a, b) => {
                if (a.interestRate > b.interestRate) return -1;
                if (b.interestRate > a.interestRate) return 1;
                return 0;
            },
            snowball: (a, b) => {
                if (a.initialPrinciple < b.initialPrinciple) return -1;
                if (b.initialPrinciple < a.initialPrinciple) return 1;
                return 0;
            }
        };
        this.loans = this.loans.sort(sortingAlgorithms[type]);
    }

    getTotalPrinciple() {
        return this.loans.reduce((total, { initialPrinciple }) => total + initialPrinciple, 0);
    }

    getRemainingBalance() {
        return this.loans.reduce((total, { remainingBalance }) => total + remainingBalance, 0);
    }

    getAverageInterest() {
        const totalPrinciple = this.getTotalPrinciple();
        return this.loans.reduce((total, { interestRate, initialPrinciple }) => total + (interestRate * (initialPrinciple / totalPrinciple)), 0);
    }

    getMinimumPayment() {
        return this.loans.reduce((total, { minimumPayment }) => total + minimumPayment, 0);
    }

    getAmortizationTable(monthlyPayment) {
        monthlyPayment === undefined ? monthlyPayment = this.getMinimumPayment() : monthlyPayment;

        let loanList = this.copy();
        let months = [];
        let paymentPerLoan = this._dividePayment(loanList, monthlyPayment);

        for (let i = 0; loanList.getRemainingBalance() > 0 && i < 10; i++) {
            let month = { monthNumber: i + 1, loans: [] };

            loanList.loans.forEach((loan, j) => {
                let loanInformation = { id: loan.id, amountPaid: paymentPerLoan[j] };
                if (loan.remainingBalance > 0) {
                    let remainingBalance = loan.makePayment(paymentPerLoan[j]);
                    if (remainingBalance <= 0) {
                        paymentPerLoan[j + 1] += Math.abs(remainingBalance);
                        loanInformation.amountPaid += remainingBalance;
                        paymentPerLoan[j] = 0;
                        loan.remainingBalance = 0;
                    }
                }
                month.loans.push(loanInformation);
                month.remainingBalance = loanList.getRemainingBalance();
            });
            months.push(month);
        }

        return months;
    }

    _dividePayment(loanList, paymentRemaining) {
        let paymentPerLoan = [];
        loanList.loans.forEach((loan, i) => {
            if (paymentRemaining > loan.minimumPayment) {
                paymentPerLoan[i] = loan.minimumPayment;
                paymentRemaining -= loan.minimumPayment;
            } else {
                paymentPerLoan[i] = paymentRemaining;
                paymentRemaining = 0;
            }
        });
        paymentPerLoan[0] += paymentRemaining;
        return paymentPerLoan;
    }

    getTotalInterestPaid() {

    }

    getPayoffDate() {

    }
}