import { writable, Writable, derived, Readable } from "svelte/store";

type Month = Map<
  string,
  {
    remainingPrincipal: number;
    payment: number;
  }
>;

export const loans: Writable<
  { name: string; principal: number; interestPct: number; minPayment: number }[]
> = writable(
  JSON.parse(window.localStorage.getItem("loans")) || [
    {
      name: "Example loan 1",
      principal: 1000,
      interestPct: 2,
      minPayment: 100,
    },
    {
      name: "Example loan 2",
      principal: 2000,
      interestPct: 3,
      minPayment: 200,
    },
  ]
);

export const monthlyPayment: Writable<number> = writable(0);

export const paymentPlan: Writable<"avalanche" | "snowball"> = writable(
  <"avalanche" | "snowball">window.localStorage.getItem("paymentPlan") ||
    "avalanche"
);

export const storage = derived(
  [loans, paymentPlan],
  ([$loans, $paymentPlan]) => {
    window.localStorage.setItem("loans", JSON.stringify($loans));
    window.localStorage.setItem("paymentPlan", $paymentPlan);
  }
);

export const paymentSchedule = derived(
  [loans, monthlyPayment, paymentPlan],
  ([$loans, $monthlyPayment, $paymentPlan]) => {
    const sortedLoans = [...$loans].sort((a, b) => {
      if ($paymentPlan === "avalanche") {
        return a.interestPct < b.interestPct ? 1 : -1;
      } else {
        return a.principal > b.principal ? 1 : -1;
      }
    });

    const createMonthZero = (loans) => {
      let month: Month = new Map();
      loans.forEach((loan) => {
        month.set(loan.name, {
          remainingPrincipal: loan.principal,
          payment: 0,
        });
      });
      return [month];
    };

    const calculatePayment = (loans, payment, months) => {
      let month: Month = new Map();
      let remainingPayment = payment;

      for (let loan of loans) {
        let principalLastMonth = months[months.length - 1].get(
          loan.name
        ).remainingPrincipal;
        let interest = ((loan.interestPct * 0.01) / 12) * principalLastMonth;
        principalLastMonth += interest;
        let record = {
          remainingPrincipal: principalLastMonth - loan.minPayment,
          payment:
            principalLastMonth < loan.minPayment
              ? principalLastMonth
              : loan.minPayment,
        };
        if (record.remainingPrincipal < 0) {
          payment += record.remainingPrincipal;
          record.remainingPrincipal = 0;
        }
        month.set(loan.name, record);
        remainingPayment -= record.payment;
      }

      for (let loan of loans) {
        let record = month.get(loan.name);
        record.remainingPrincipal -= remainingPayment;
        record.payment += remainingPayment;
        remainingPayment = 0;
        if (record.remainingPrincipal <= 0) {
          record.payment += record.remainingPrincipal;
          remainingPayment -= record.remainingPrincipal;
          record.remainingPrincipal = 0;
        }
        month.set(loan.name, record);
      }

      months = [...months, month];
      return months;
    };

    const generatePaymentSchedule = (loans, payment) => {
      let months = createMonthZero(loans);

      for (let i = 0; i < 200; i++) {
        months = calculatePayment(loans, payment, months);
        let currentMonth = months[months.length - 1];
        let remaining = 0;
        for (let loanName of currentMonth.keys()) {
          remaining += currentMonth.get(loanName).remainingPrincipal;
        }

        if (remaining === 0) break;
      }
      return months;
    };

    return generatePaymentSchedule(sortedLoans, $monthlyPayment);
  }
);
