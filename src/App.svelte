<script lang="ts">
	import LoanList from "./LoanList.svelte";
	import PaymentSchedule from "./PaymentSchedule.svelte";
	import QuickFacts from "./QuickFacts.svelte";
	import SetPaymentPlan from "./SetPaymentPlan.svelte";
</script>

<main class="ui container">
	<section>
		<LoanList />
	</section>
	<section>
		<SetPaymentPlan/>
		<QuickFacts />
	</section>
	<section>
		<PaymentSchedule />
	</section>
</main>

<style>
section {
	margin: 1em 0 2em;
	display: flex;
	flex-direction: row;
}
</style>
