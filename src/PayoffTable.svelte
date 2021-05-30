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
            return a.interestPct > b.interestPct ? 1 : -1;
        } else {
            return a.principal < b.principal ? 1 : -1;
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

    $: createMonthZero(sortedLoans);
</script>

<div>
    <h1>Payoff Table</h1>
    <table>
        <tr>
            <th>Month</th>
            <th>Loan Name</th>
            <th>Remaining</th>
        </tr>
        {#each months as month, i}
            {#each [...month.keys()] as loanName}
                <tr>
                    <td>{i}</td>
                    <td>{loanName}</td>
                    <td>{month.get(loanName).remainingPrincipal}</td>
                </tr>
            {/each}
        {/each}
    </table>
</div>

<style>
</style>
