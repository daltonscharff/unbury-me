export default class LoanList {
    constructor() {
        this.loans = [...arguments];
        this.sortType = 'avalanche';
        // this._update();
    }

    add(loan) {
        this.loans.push(loan);
        console.log(this.loans);
        return this;
    }

    remove(id) {
        this.loans = this.loans.filter((loan) => loan.id !== id);
        // this._update();
    }

    copy() {
        return new LoanList(...this.loans.map((loan) => loan.copy()));
    }

    sort(type = 'avalanche') {
        this.sortType = type;
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
        // this.loans = this.loans.sort(sortingAlgorithms[type]);
    }

    _update() {
        this.sort();
        this.totalPrinciple = this._getTotalPrinciple();
        this.remainingBalance = this._getRemainingBalance();
        this.averageInterest = this._getAverageInterest();
        this.minimumPayment = this._getMinimumPayment();
        this.amortizationTable = this._getAmortizationTable();
    }

    _getTotalPrinciple() {
        return this.loans.reduce((total, { initialPrinciple }) => total + initialPrinciple, 0);
    }

    _getRemainingBalance() {
        return this.loans.reduce((total, { remainingBalance }) => total + remainingBalance, 0);
    }

    _getAverageInterest() {
        const totalPrinciple = this._getTotalPrinciple();
        return this.loans.reduce((total, { interestRate, initialPrinciple }) => total + (interestRate * (initialPrinciple / totalPrinciple)), 0);
    }

    _getMinimumPayment() {
        return this.loans.reduce((total, { minimumPayment }) => total + minimumPayment, 0);
    }

    _getAmortizationTable(monthlyPayment) {
        monthlyPayment === undefined ? monthlyPayment = this._getMinimumPayment() : monthlyPayment = monthlyPayment;
        return new AmortizationTable(this.copy(), monthlyPayment);
    }
}

class AmortizationTable {
    constructor(loanList, monthlyPayment) {
        this.amortizationTable = this._getTable(loanList, monthlyPayment);
        this.totalInterestPaid = loanList.loans.reduce((total, loan) => total + loan.totalInterestPaid, 0);
        this.monthsUntilPayoff = this.amortizationTable.length;
    }

    _getTable(loanList, monthlyPayment) {
        let table = [];
        let paymentPerLoan = this._dividePayment(loanList, monthlyPayment);

        while (loanList.getRemainingBalance() > 0) {
            let record = this._getRecord(loanList, paymentPerLoan);
            table.push(record);
        }

        return table;
    }

    _getRecord(loanList, paymentPerLoan) {
        let record = [];

        loanList.loans.forEach((loan, i) => {
            let payment = loan.makePayment(paymentPerLoan[i]);

            if (payment.overpayment) {
                paymentPerLoan[i + 1] += payment.overpayment;
            }

            delete payment.overpayment;
            record.push({ id: loan.id, ...payment });
        });

        return record;
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
}