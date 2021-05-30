<script lang="ts">
    import { loans, monthlyPayment, paymentPlan } from "./stores";

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

    const generatePayoffTable = (loans, payment) => {
        createMonthZero(loans);
        calculatePayment(loans, payment);
        calculatePayment(loans, payment);
    };

    $: generatePayoffTable(sortedLoans, $monthlyPayment);
</script>

<div>
    <h1>Payoff Table</h1>
    <table>
        <tr>
            <th>Month</th>
            <th>Loan Name</th>
            <th>Payment</th>
            <th>Remaining</th>
        </tr>
        {#each months as month, i}
            {#each [...month.keys()] as loanName}
                <tr>
                    <td>{i}</td>
                    <td>{loanName}</td>
                    <td>{month.get(loanName).payment}</td>
                    <td>{month.get(loanName).remainingPrincipal}</td>
                </tr>
            {/each}
        {/each}
    </table>
</div>

<style>
</style>
