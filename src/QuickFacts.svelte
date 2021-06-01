<script lang="ts">
	import { paymentSchedule, loans } from "./stores";

    $: totalPaid = $paymentSchedule.reduce((total, record) => {
        for (let loan of record.keys()) {
            total += record.get(loan).payment;
        }
        return total;
    }, 0);
    $: totalOwed = $loans.reduce((total, loan) => total + loan.principal, 0);
    $: averageInterest = $loans.reduce((total, loan) => total + (loan.interestPct * loan.principal / totalOwed), 0);
</script>

<div class="ui container">
    <h1>Quick Facts</h1>
    <p>Total Owed: ${totalOwed}</p>
    <p>Months: {$paymentSchedule.length - 1}</p>
    <p>Interest Paid: ${(totalPaid - totalOwed).toFixed(2)}</p>
    <p>Average Interest Rate: {averageInterest.toFixed(2)}%</p>
</div>

<style>
</style>
