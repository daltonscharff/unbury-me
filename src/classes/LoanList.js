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
        return new LoanList(this.loans.map((loan) => loan.copy()));
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
        monthlyPayment = monthlyPayment || this.getMinimumPayment();
        let loanArray = this.copy();
        let months = [];

        // while (loanArray.remainingBalance() > 0){
        // month 1



    }

    getTotalInterestPaid() {

    }

    getPayoffDate() {

    }
}