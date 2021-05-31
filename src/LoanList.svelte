<script lang="ts">
	import { loans } from "./stores";

	let newLoan: {
		name: string;
		principal: number;
		interestPct: number;
		minPayment: number;
	};

	const addNewLoan = () => {
		loans.set([...$loans, newLoan]);
		resetNewLoan();
	};

	const resetNewLoan = () => {
		newLoan = {
			name: undefined,
			principal: undefined,
			interestPct: undefined,
			minPayment: undefined,
		};
	};

	resetNewLoan();

	const deleteLoan = (i) => {
		$loans = $loans.filter((_, index) => index != i);
	};
</script>

<div>
	<h1>Loans</h1>
	<div class="container">
		{#each $loans as loan, i}
		<div class="card">
			<div class="title">
				<h1>{loan.name}</h1>
				<span on:click={() => deleteLoan(i)} class="material-icons-outlined">delete</span>
			</div>
			<div class="content">
				<p>${loan.principal}</p>
				<p>{loan.interestPct}% interest</p>
				<p>${loan.minPayment}/month</p>
			</div>
		</div>
		{/each}
		<div class="card new-card">
			<input type="text" placeholder="Name" bind:value={newLoan.name} />
			<input type="number" placeholder="Principal" bind:value={newLoan.principal} /> 
			<input type="number" placeholder="Interest %" bind:value={newLoan.interestPct} /> 
			<input type="number" placeholder="Minimum Payment" bind:value={newLoan.minPayment} /> 
			<button on:click="{addNewLoan}">Add</button>
		</div>
	</div>
</div>

<style type="text/scss">	
.container {
	display: flex;
	flex-wrap: wrap;
}

.card {
	padding: 1em;
	box-shadow: 0 1px 1px #999;
	margin: 1em;
	min-width: 13em;
	display: flex;
	flex-direction: column;

	p {
		margin: 0 0 .25em;
	}
	
	.title {
		align-items: center;
		justify-content: space-between;
		display: flex;
		flex-direction: row;
		margin: 0 0 .25em;

		h1 {
			font-size: 1.5em;
			padding-right: 2em;
			margin: 0;
		}

		span {
			cursor: pointer;
		}
	}

	.content {
		height: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;

		p {
			margin: .5em 0;
		}
	}
}

.new-card {
	display: flex;
	flex-direction: column;

	input {
		border: none;
		padding: 1px 0;
		border-bottom: 1px solid #999;
	}
}
</style>
