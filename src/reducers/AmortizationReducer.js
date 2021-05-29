class AmortizationTable {
    constructor(loans, monthlyPayment, sortType) {
        this.loans = loans;
        this.monthlyPayment = monthlyPayment;
        this.sortType = sortType;
        this.table = this._getTable(this.loans, this.monthlyPayment);
        this.numberOfPayments = this._getNumberOfPayments(this.table);
        this.interestPaid = this._getInterestPaid(this.table);
    }

    _getTable(loans) {
        let table = [];

        return table;
    }

    _getNumberOfPayments(table) {

    }

    _getInterestPaid(table) {

    }
}

const AmortizationReducer = (state = [], action) => {
    switch (action.type.toLowerCase()) {
        case 'update':
            return new AmortizationTable(action.loans, action.monthlyPayment, action.sortType);
        default:
            return new Error('Not a valid action type.');
    }
};

export { AmortizationReducer as default, AmortizationTable };