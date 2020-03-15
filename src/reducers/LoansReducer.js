const uuid = require('uuid/v4');

const LoansReducer = (state = [], action) => {
    switch (action.type.toLowerCase()) {
        case 'create':
            return [...state, { id: uuid() }];
        case 'update':
            return state.map((value, index) => {
                if (value.id !== action.id) {
                    return value;
                } else {
                    return {
                        id: action.id,
                        name: action.name,
                        principle: action.principle
                    }
                }
            })
        case 'list':
            return state;
        default:
            return new Error('Not a valid action type.');
    }
}

export default LoansReducer;