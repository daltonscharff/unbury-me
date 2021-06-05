<script lang="ts">
    import { paymentSchedule, loans } from "./stores";

    $: totalPaid = $paymentSchedule.reduce((total, record) => {
        for (let loan of record.keys()) {
            total += record.get(loan).payment;
        }
        return total;
    }, 0);
    $: totalOwed = $loans.reduce((total, loan) => total + loan.principal, 0);
    $: averageInterest = $loans.reduce(
        (total, loan) =>
            total + (loan.interestPct * loan.principal) / totalOwed,
        0
    );
</script>

<div class="statistics">
    <div class="statistic">
        <div class="value">${totalOwed}</div>
        <div class="label">Total Owed</div>
    </div>
    <div class="statistic">
        <div class="value">{$paymentSchedule.length - 1}</div>
        <div class="label">Months</div>
    </div>
    <div class="statistic">
        <div class="value">${(totalPaid - totalOwed).toFixed(2)}</div>
        <div class="label">Interest Accrued</div>
    </div>
    <div class="statistic">
        <div class="value">{averageInterest.toFixed(2)}%</div>
        <div class="label">Avg. Interest</div>
    </div>
</div>

<style>
.statistics {
    display: flex;
    justify-content: space-around !important;
    width: 100%;
    text-align: center;
    flex-wrap: wrap;
}

.statistic {
    flex-shrink: 1;
    padding: .5em;
}

.statistic .value {
    font-size: 2.8em !important;
}

.statistic .label {
    font-size: 1em !important;
    font-weight: normal;
    text-transform: capitalize;
    margin: .5em auto;
}
</style>
