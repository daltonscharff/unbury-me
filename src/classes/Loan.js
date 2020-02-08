const uuid = require('uuid/v4');

export default class Loan {
    constructor(id, name, principle, interestRate, minimumPayment) {
        this.id = id || uuid();
        this.name = name;
        this.initialPrinciple = principle;
        this.remainingBalance = principle;
        this.interestRate = interestRate;
        this.minimumPayment = minimumPayment;
        this.totalInterestPaid = 0;
    }

    copy() {
        return new Loan(this.id, this.name, this.principle, this.interestRate, this.minimumPayment);
    }

    getInterest() {
        return Math.round(this.remainingBalance * this.interestRate / 12);
    }

    getPayoffAmount() {
        return Math.round(this.remainingBalance + this.getInterest());
    }

    makePayment(amountPaid) {
        amountPaid = amountPaid || this.minimumPayment;
        const interestPaid = this.getInterest();
        const principlePaid = Math.round(amountPaid - interestPaid);

        this.totalInterestPaid += interestPaid;
        this.remainingBalance -= principlePaid;

        return this.remainingBalance;
    }
}