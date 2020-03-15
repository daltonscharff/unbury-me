const uuid = require('uuid/v4');

const LoansReducer = (state = [], action) => {
    switch (action.type.toLowerCase()) {
        case 'create':
            return [...state,
            {
                id: uuid(),
                name: '',
                principle: 0,
                interestRate: 0,
                minimumPayment: 0
            }];
        case 'update':
            return state.map((value) => {
                if (value.id !== action.id) {
                    return value;
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
        case 'delete':
            return state.filter((value) => value.id !== action.id);
        case 'read':
            return [...state];
        default:
            return new Error('Not a valid action type.');
    }
}

export default LoansReducer;