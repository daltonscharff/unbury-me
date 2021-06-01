<script lang="ts">
    import { loans, monthlyPayment, paymentPlan, paymentSchedule } from "./stores";

    type Month = Map<
        string,
        {
            remainingPrincipal: number;
            payment: number;
        }
    >;

    $: sortedLoans = [...$loans].sort((a, b) => {
        if ($paymentPlan === "avalanche") {
            return a.interestPct < b.interestPct ? 1 : -1;
        } else {
            return a.principal > b.principal ? 1 : -1;
        }
    });

    $: months = [];

    const createMonthZero = (loans) => {
        months = [];
        let month: Month = new Map();
        loans.forEach((loan) => {
            month.set(loan.name, {
                remainingPrincipal: loan.principal,
                payment: 0,
            });
        });
        months = [...months, month];
    };

    const calculatePayment = (loans, payment) => {
        let month: Month = new Map();
        let remainingPayment = payment;

        for (let loan of loans) {
            let principalLastMonth = months[months.length - 1].get(loan.name).remainingPrincipal;
            let interest = loan.interestPct * 0.01 / 12 * principalLastMonth;
            principalLastMonth += interest;
            let record = {
                remainingPrincipal: principalLastMonth - loan.minPayment,
                payment: principalLastMonth < loan.minPayment ? principalLastMonth : loan.minPayment,
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
    };

    const generatePaymentSchedule = (loans, payment) => {
        createMonthZero(loans);

        for (let i = 0; i < 100; i++) {
            calculatePayment(loans, payment);
            let currentMonth = months[months.length - 1];
            let remaining = 0;
            for (let loanName of currentMonth.keys()) {
                remaining += currentMonth.get(loanName).remainingPrincipal;
            }

            if (remaining === 0) break;
        }
        return months;
    };

    $: $paymentSchedule = generatePaymentSchedule(sortedLoans, $monthlyPayment);
</script>

<div>
    <h1>Payoff Schedule</h1>
    <table class="ui celled structured unstackable table">
        <thead>
            <tr>
                <th>Month</th>
                <th>Loan</th>
                <th>Payment</th>
                <th>Remaining</th>
            </tr>
        </thead>
        <tbody>
            {#each months as month, i}
            {#if i > 0}
            {#each [...month.keys()] as loanName, j}
            <tr>
                {#if j === 0}
                <td rowspan={$loans.length}>{i}</td>
                {/if}
                <td>{loanName}</td>
                <td>${month.get(loanName).payment.toFixed(2)}</td>
                <td>${month.get(loanName).remainingPrincipal.toFixed(2)}</td>
            </tr>
            {/each}
            {/if}
            {/each}
        </tbody>
    </table>
</div>

<style>
</style>
