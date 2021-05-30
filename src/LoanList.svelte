<script lang="ts">
	import { loans } from "./stores";

	let newLoan: { name: string, principal: number, interestPct: number, minPayment: number };
	
	const addNewLoan = () => {
		loans.set([...$loans, newLoan]);
		resetNewLoan();
	}
	
	const resetNewLoan = () => {
		newLoan = { name: undefined, principal: undefined, interestPct: undefined, minPayment: undefined };
	}

	resetNewLoan();


	const deleteLoan = (i) => {
		$loans = $loans.filter((_, index) => index != i);
	}
</script>

<div>
	<h1>Loans</h1>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Principal</th>
				<th>Interest</th>
				<th>Minimum Payment</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each $loans as loan, i}
			<tr>
				<td>{loan.name}</td>
				<td>{loan.principal}</td>
				<td>{loan.interestPct}%</td>
				<td>${loan.minPayment}</td>
				<td><button on:click="{() => deleteLoan(i)}">delete</button></td>
			</tr>
			{/each}
			<tr>
				<td><input type="text" placeholder="Name" bind:value={newLoan.name} /> </td>
				<td><input type="number" placeholder="Principal" bind:value={newLoan.principal} /> </td>
				<td><input type="number" placeholder="Interest %" bind:value={newLoan.interestPct} /> </td>
				<td><input type="number" placeholder="Minimum Payment" bind:value={newLoan.minPayment} /> </td>
				<button on:click="{addNewLoan}">add</button>
			</tr>
		</tbody>
	</table>
</div>

<style>	
</style>