import Loan from '../../classes/Loan';
import LoanList from '../../classes/LoanList';
import amortizationTableFixtures from '../fixtures/amortizationTable';

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
    const loans = new LoanList(loan1, loan2);
    let loans_copy = loans.copy();
    expect(loans_copy.loans).toEqual(loans.loans);
    loans_copy.add(loan3);
    expect(loans.loans).not.toContain(loan3);
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

test('Should divide payment among loans', () => {
    const loan1 = new Loan(undefined, 'loan 1', 1000, 0.05, 10);
    const loan2 = new Loan(undefined, 'loan 2', 500, 0.05, 5);
    const loan3 = new Loan(undefined, 'loan 3', 2000, 0.06, 20);
    const loans = new LoanList(loan1, loan2, loan3);
    expect(loans._dividePayment(loans, 40)).toEqual([15, 5, 20]);
    expect(loans._dividePayment(loans, 12)).toEqual([10, 2, 0]);
});

test('Should return an avalanche sorted amortization table', () => {
    const loan1 = new Loan('088c74cb-2043-403b-92e3-7181af326852', 'loan 1', 1000, 0.04, 10);
    const loan2 = new Loan('9118aa69-4b81-49a6-ba08-fb9c71c01603', 'loan 2', 500, 0.05, 5);
    const loan3 = new Loan('2a74ce13-9e5f-4f3a-810a-a430225ec66a', 'loan 3', 2000, 0.06, 20);
    const loans = new LoanList(loan1, loan2, loan3);
    loans.sort();

    const monthlyPayment = 500;
    expect(loans.getAmortizationTable(monthlyPayment)).toMatchObject(amortizationTableFixtures.avalanche);
});

test('Should return a snowball sorted amortization table', () => {
    const loan1 = new Loan('088c74cb-2043-403b-92e3-7181af326852', 'loan 1', 1000, 0.04, 10);
    const loan2 = new Loan('9118aa69-4b81-49a6-ba08-fb9c71c01603', 'loan 2', 500, 0.05, 5);
    const loan3 = new Loan('2a74ce13-9e5f-4f3a-810a-a430225ec66a', 'loan 3', 2000, 0.06, 20);
    const loans = new LoanList(loan1, loan2, loan3);
    loans.sort('snowball');

    const monthlyPayment = 500;
    expect(loans.getAmortizationTable(monthlyPayment)).toMatchObject(amortizationTableFixtures.snowball);
});