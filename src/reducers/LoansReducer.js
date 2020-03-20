const uuid = require('uuid/v4');

const LoansReducer = (state = [], action) => {
    switch (action.type.toLowerCase()) {
        case 'add_loan':
            return [...state,
            {
                id: uuid(),
                name: action.name || '',
                principle: action.principle || 0,
                interestRate: action.interestRate || 0,
                minimumPayment: action.minimumPayment || 0
            }];
        case 'update_loan':
            return state.map((loan) => {
                if (loan.id !== action.id) {
                    return loan;
                } else {
                    return {
                        id: action.id,
                        name: action.name,
                        principle: parseFloat(action.principle) || 0,
                        interestRate: parseFloat(action.interestRate) || 0,
                        minimumPayment: parseFloat(action.minimumPayment) || 0
                    }
                }
            })
        case 'remove_loan':
            return state.filter((loan) => loan.id !== action.id);
        default:
            return new Error('Not a valid action type.');
    }
};

export default LoansReducer;