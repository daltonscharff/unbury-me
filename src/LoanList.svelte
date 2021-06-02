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

	const toggleVisibility = (e) => {
		let target = e.target;
		if (!target.classList.contains("title")) target = target.parentElement;
		target.classList.toggle("active");
		target.nextElementSibling.classList.toggle("active");
	};
</script>

<div class="ui styled accordion">
	{#each $loans as loan, i}
		<div class="title" on:click={(event) => toggleVisibility(event)}>
			<i class="dropdown icon" />
			{loan.name}
			<i class="icon trash alternate outline float-right" on:click={() => deleteLoan(i)} />
		</div>
		<div class="content">
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
	{/each}
	<div class="new-loan content active">
		<form class="ui form" on:submit={(e) => e.preventDefault()}>
			<input
				type="text"
				placeholder="Loan Name"
				bind:value={newLoan.name}
			/>
			<input
				type="number"
				placeholder="Principal"
				bind:value={newLoan.principal}
			/>
			<input
				type="number"
				placeholder="Interest %"
				bind:value={newLoan.interestPct}
			/>
			<input
				type="number"
				placeholder="Minimum Payment"
				bind:value={newLoan.minPayment}
			/>
			<button class="ui button" on:click={addNewLoan}>
				Add Loan
			</button>
		</form>
	</div>
</div>

<style type="text/scss">
	.accordion {
		width: auto !important;
	}
	
	.title {
		color: black !important;
	}

	.float-right {
		float: right;
	}

	.trash.icon {
		padding: 0 15px 20px;
	}

	.button {
		margin: 2em auto auto;
		width: 100%;
	}

	.new-loan:not(:first-child) {
		border-top: 1px solid rgba(34,36,38,.15);
	}

	input {
		border-top: 0 !important;
		border-left: 0 !important;
		border-right: 0 !important;
		padding-left: 0.25em !important;
	}

	input[type="number"] {
		-moz-appearance: textfield !important;
	}

	::placeholder {
		color: black !important;
	}
</style>
