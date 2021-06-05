<script lang="ts">
    import { loans, paymentSchedule } from "./stores";
</script>

<div class="table-container">
    <table class="ui structured unstackable table">
        <thead>
            <tr>
                <th>Month</th>
                <th>Loan</th>
                <th>Payment</th>
                <th>Remaining</th>
            </tr>
        </thead>
        <tbody>
            {#each $paymentSchedule as month, i}
                {#if i > 0}
                    {#each [...month.keys()] as loanName, j}
                        <tr>
                            {#if j === 0}
                                <td rowspan={$loans.length}>{i}</td>
                            {/if}
                            <td>{loanName}</td>
                            <td>${month.get(loanName).payment.toFixed(2)}</td>
                            <td
                                >${month
                                    .get(loanName)
                                    .remainingPrincipal.toFixed(2)}</td
                            >
                        </tr>
                    {/each}
                {/if}
            {/each}
        </tbody>
    </table>
</div>

<style>
    .table-container {
        max-width: 100%;
        overflow-y: scroll !important;
    }
</style>
