<script lang="ts">
	import LoanList from "./LoanList.svelte";
	import PaymentSchedule from "./PaymentSchedule.svelte";
	import QuickFacts from "./QuickFacts.svelte";
	import SetPaymentPlan from "./SetPaymentPlan.svelte";
</script>

<main class="ui container flex">
	<div class="flex inputs">
		<SetPaymentPlan/>
		<LoanList />
	</div>
	<div class="flex outputs">
		<QuickFacts />
		<PaymentSchedule />
	</div>
</main>

<style>
.flex {
	flex-wrap: wrap;
	flex-grow: 1;
	flex-shrink: 1;
	margin: 1em;
}

.inputs {
	min-width: 250px;
	width: 300px;
}

.outputs {
	width: 60%;
}

div.flex {
	flex-direction: column;
}
</style>
