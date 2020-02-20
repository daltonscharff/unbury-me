const LoansReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_LOAN':
            return state.concat(
                {
                    name: action.name,
                    principle: action.principle,
                    interestRate: action.interestRate,
                    minimumPayment: action.minimumPayment
                }
            );
        case 'REMOVE_LOAN':
            return state.filter((_, i) => action.i !== i);
        case 'UPDATE_LOAN':
            return state.map((loan, i) => {
                return action.i !== i ? loan : {
                    name: action.name,
                    principle: action.principle,
                    interestRate: action.interestRate,
                    minimumPayment: action.minimumPayment
                }
            });
        default:
            return state;
    }
}

export default LoansReducer;