<script lang="ts">
	import { loans } from "./stores";

	const deleteLoan = (i) => {
		$loans = $loans.filter((_, index) => index != i);
	}
</script>

<div>
	<h1>Loans</h1>
	{#each $loans as loan, i}
	<p>
		name: {loan.name}, principal: {loan.principal}
		<button on:click="{() => deleteLoan(i)}">delete</button>
	</p>
	{/each}
</div>

<style>	
</style>