import Loan from '../../classes/Loan';
import LoanList from '../../classes/LoanList';

test('Should create loan list', () => {
    const loan1 = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    const loan2 = new Loan(undefined, 'loan 2', 500, 0.05, 5);
    const loan3 = new Loan(undefined, 'loan 3', 2000, 0.06, 20);
    const loans = new LoanList(loan1, loan2, loan3);
    expect(loans.loans.length).toEqual(3);
});

test('Should add loan', () => {
    const loan1 = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    const loans = new LoanList();
    loans.add(loan1);
    expect(loans.loans.length).toEqual(1);
    expect(loans.loans).toContain(loan1);
});

test('Should remove loan', () => {
    const loan1 = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    const loan2 = new Loan(undefined, 'loan 2', 500, 0.05, 5);
    const loan3 = new Loan(undefined, 'loan 3', 2000, 0.06, 20);
    const loans = new LoanList(loan1, loan2, loan3);
    loans.remove(loan2.id);
    expect(loans.loans.length).toEqual(2);
    expect(loans.loans).not.toContain(loan2);
});

test('Should deep copy loan list', () => {
    const loan1 = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    const loan2 = new Loan(undefined, 'loan 2', 500, 0.05, 5);
    const loan3 = new Loan(undefined, 'loan 3', 2000, 0.06, 20);
    const loansOriginal = new LoanList(loan1, loan2);
    let loansCopy = loansOriginal.copy();
    loansCopy.add(loan3);
    expect(loansOriginal.loans).not.toContain(loan3);
});

test('Should avalanche sort (by interest rate)', () => {
    const loan1 = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    const loan2 = new Loan(undefined, 'loan 2', 500, 0.05, 5);
    const loan3 = new Loan(undefined, 'loan 3', 2000, 0.06, 20);
    const loans = new LoanList(loan1, loan2, loan3);
    loans.sort();
    expect(loans.loans[0]).toBe(loan3);
});

test('Should snowball sort (by principle)', () => {
    const loan1 = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    const loan2 = new Loan(undefined, 'loan 2', 500, 0.05, 5);
    const loan3 = new Loan(undefined, 'loan 3', 2000, 0.06, 20);
    const loans = new LoanList(loan1, loan2, loan3);
    loans.sort('snowball');
    expect(loans.loans).toEqual([loan2, loan1, loan3]);
});

test('Should get total principle', () => {
    const loan1 = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    const loan2 = new Loan(undefined, 'loan 2', 500, 0.05, 5);
    const loan3 = new Loan(undefined, 'loan 3', 2000, 0.06, 20);
    const loans = new LoanList(loan1, loan2, loan3);
    expect(loans.getTotalPrinciple()).toEqual(3500);
});

test('Should get remaining balance', () => {
    const loan1 = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    const loan2 = new Loan(undefined, 'loan 2', 500, 0.05, 5);
    const loan3 = new Loan(undefined, 'loan 3', 2000, 0.06, 20);
    const loans = new LoanList(loan1, loan2, loan3);
    expect(loans.getRemainingBalance()).toEqual(3500);
    loans.loans[0].makePayment();
    expect(loans.getRemainingBalance()).toEqual(3494);
});

test('Should get average interest', () => {
    const loan1 = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    const loan2 = new Loan(undefined, 'loan 2', 500, 0.05, 5);
    const loan3 = new Loan(undefined, 'loan 3', 2000, 0.06, 20);
    const loans = new LoanList(loan1, loan2, loan3);
    expect(loans.getAverageInterest()).toBeCloseTo(0.055714, 6);
});

test('Should get minimum payment', () => {
    const loan1 = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    const loan2 = new Loan(undefined, 'loan 2', 500, 0.05, 5);
    const loan3 = new Loan(undefined, 'loan 3', 2000, 0.06, 20);
    const loans = new LoanList(loan1, loan2, loan3);
    expect(loans.getMinimumPayment()).toEqual(35);
});