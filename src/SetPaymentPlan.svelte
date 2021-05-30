<script lang="ts">
	import { loans, monthlyPayment, paymentPlan } from "./stores";

   $: minimumMonthlyPayment = $loans.reduce((total, loan) => total + loan.minPayment, 0);
   $: maximumMonthlyPayment = $loans.reduce((total, loan) => total + loan.principal, 0);
   $: $monthlyPayment = minimumMonthlyPayment;
</script>

<div>
	<h1>Set Payment Plan</h1>
    <label>
        <input type="radio" bind:group={$paymentPlan} value="avalanche">
        Highest Interest Rate (Avalanche)
    </label>
    <label>
        <input type="radio" bind:group={$paymentPlan} value="snowball">
        Lowest Principal (Snowball)
    </label>

    <p>monthly payment: {$monthlyPayment}</p>
    <input type="range" bind:value="{$monthlyPayment}" min="{minimumMonthlyPayment}" max="{maximumMonthlyPayment}" />
</div>

<style>
</style>