import Loan from '../../classes/Loan';

test('Should create new loan', () => {
    const loan = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    expect(loan).not.toBeNull();
    expect(loan.id).not.toBeNull();
    expect(true);
});

test('Should deep copy loan', () => {
    const loan = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    let loan_copy = loan.copy();
    loan_copy.id = 0;
    expect(loan.name).toEqual(loan_copy.name);
    expect(loan.id).not.toEqual(loan_copy.id);
});

test('Should get interest', () => {
    const loan = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    expect(loan.getInterest()).toEqual(4);
});

test('Should get payoff amount', () => {
    const loan = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    expect(loan.getPayoffAmount()).toEqual(1004);
});

test('Should make the minimum loan payment', () => {
    const loan = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    loan.makePayment();
    expect(loan.remainingBalance).toEqual(994);
});

test('Should make the maximum loan payment', () => {
    const loan = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    loan.makePayment(loan.getPayoffAmount());
    expect(loan.remainingBalance).toEqual(0);
});