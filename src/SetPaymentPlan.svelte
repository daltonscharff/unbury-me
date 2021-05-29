<script lang="ts">
	import { loans } from "./stores";
    import LoanList from "./LoanList.svelte";
	import AddLoan from "./AddLoan.svelte";

   $: minimumMonthlyPayment = $loans.reduce((total, loan) => total + loan.minPayment, 0);
</script>

<main>
	<h1>Set Payment Plan</h1>
    <p>minimumMonthlyPayment: {minimumMonthlyPayment}</p>
</main>

<style>
</style>