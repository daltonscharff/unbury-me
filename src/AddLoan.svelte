<script lang="ts">
	import { loans } from "./stores";
	let loan: { name: string, principal: number, interestPct: number, minPayment: number };
	
	const addLoan = () => {
		loans.set([...$loans, loan]);
		resetLoan();
	}
	
	const resetLoan = () => {
		loan = { name: undefined, principal: undefined, interestPct: undefined, minPayment: undefined };
	}
	
	resetLoan();
</script>

<div>
	<h1>Add Loan</h1>
	<input type="text" placeholder="Name" bind:value={loan.name} />
	<input type="number" placeholder="Principal" bind:value={loan.principal} />
	<input type="number" placeholder="Interest %" bind:value={loan.interestPct} />
	<input type="number" placeholder="Minimum Payment" bind:value={loan.minPayment} />
	<button on:click="{addLoan}">
		Add
	</button>
</div>

<style>
</style>
