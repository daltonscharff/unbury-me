const LoansReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_LOAN':
            return state.concat(
                {
                    name: action.name,
                    amount: action.amount,
                    apr: action.apr,
                    minPayment: action.minPayment
                }
            );
        case 'REMOVE_LOAN':
            return state.filter((_, i) => action.i !== i);
        case 'UPDATE_LOAN':
            return state.map((loan, i) => {
                return action.i !== i ? loan : {
                    name: action.name,
                    amount: action.amount,
                    apr: action.apr,
                    minPayment: action.minPayment
                }
            });
        default:
            return state;
    }
}

export { LoansReducer as default };