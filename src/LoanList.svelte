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

<div class="ui container">
	<h1>Loans</h1>
	<div class="ui cards">
		{#each $loans as loan, i}
		<div class="card">
			<div class="content">
				<span on:click={() => deleteLoan(i)} class="material-icons right floated icon">delete</span>
				<div class="header">
					{loan.name}
				</div>
				<div class="description">
					<div>
						<b>Principal: </b>
						${loan.principal}
					</div>
					<div>
						<b>Interest: </b>
						{loan.interestPct}%
					</div>
					<div>
						<b>Monthly Payment: </b>
						${loan.minPayment}
					</div>
				</div>
			</div>
		</div>
		{/each}
		<div class="card">
			<div class="content">
				<form class="ui form">
					<input type="text" placeholder="Loan Name" bind:value={newLoan.name} />
					<input type="number" placeholder="Principal" bind:value={newLoan.principal} /> 
					<input type="number" placeholder="Interest %" bind:value={newLoan.interestPct} /> 
					<input type="number" placeholder="Minimum Payment" bind:value={newLoan.minPayment} />
				</form>
			</div>
			<div class="ui bottom attracted button" on:click="{addNewLoan}">
				Add Loan
			</div>
		</div>
	</div>
</div>

<style type="text/scss">	
.material-icons {
	cursor: pointer;
	font-size: 1.2em;
	color: #333;
}

.card {
	flex-grow: 1;
}

input {
	border-top: 0 !important;
	border-left: 0 !important;
	border-right: 0 !important;
	padding-left: .25em !important;
}

input[type=number] {
  -moz-appearance: textfield !important;
}

::placeholder {
	color: #333 !important;
}
</style>
