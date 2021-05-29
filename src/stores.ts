import { writable, Writable, derived, Readable } from 'svelte/store';

export const loans: Writable<{ name: string, principal: number, interestPct: number, minPayment: number }[]> = writable([
    {
        name: "loan1",
        principal: 5000,
        interestPct: 5,
        minPayment: 200
    }, {
        name: "loan2",
        principal: 3000,
        interestPct: 1,
        minPayment: 100
    }
]);

export const monthlyPayment: Writable<number> = writable(0);

