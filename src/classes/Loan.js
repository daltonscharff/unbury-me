const uuid = require('uuid/v4');

export default class Loan {
    constructor(name, principle, interestRate, minimumPayment, id) {
        this.id = id || uuid();
        this.name = name;
        this.initialPrinciple = principle;
        this.remainingBalance = principle;
        this.interestRate = interestRate;
        this.minimumPayment = minimumPayment;
        this.totalInterestPaid = 0;
    }

    copy() {
        return new Loan(this.name, this.initialPrinciple, this.interestRate, this.minimumPayment, this.id);
    }

    getInterest() {
        return Math.round(this.remainingBalance * this.interestRate / 12);
    }

    getPayoffAmount() {
        return Math.round(this.remainingBalance + this.getInterest());
    }

    makePayment(payment) {
        payment = (payment === undefined) ? this.minimumPayment : payment;
        let amountPaid = {
            total: payment,
            toInterest: this.getInterest(),
            toPrinciple: payment - this.getInterest()
        };

        this.remainingBalance -= amountPaid.toPrinciple;
        this.totalInterestPaid += amountPaid.toInterest;

        let overpayment = 0;
        if (this.remainingBalance < 0) {
            amountPaid.toPrinciple += this.remainingBalance;
            amountPaid.total = amountPaid.toInterest + amountPaid.toPrinciple;
            overpayment = Math.abs(this.remainingBalance);
            this.remainingBalance = 0;
        }

        return {
            amountPaid,
            remainingBalance: this.remainingBalance,
            overpayment
        };
    }
}