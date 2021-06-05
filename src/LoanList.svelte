<script lang="ts">
	import { loans } from "./stores";

	type Loan = {
		name: string;
		principal: number;
		interestPct: number;
		minPayment: number;
	};

	let newLoan: Loan;
	let newLoanError: {
		name: string;
		principal: string;
		interestPct: string;
		minPayment: string;
	} = {name: "", principal: "", interestPct: "", minPayment: ""};

	const addNewLoan = () => {
		newLoan = cleanLoan(newLoan);
		
		if (validateLoan(newLoan)) {
			loans.set([...$loans, newLoan]);
			resetNewLoan();
		}
	};

	const cleanLoan = (loan: Loan): Loan => {
		let cleanLoan = {...loan};
		cleanLoan.name = loan.name?.trim() || "";
		cleanLoan.principal = Number(loan.principal?.toString().replaceAll('$', '').trim()) || null;
		cleanLoan.interestPct = Number(loan.interestPct?.toString().replaceAll('%', '').trim()) || null;
		cleanLoan.minPayment = Number(loan.minPayment?.toString().replaceAll('$', '').trim()) || null;
		return cleanLoan;
	}

	const validateLoan = (loan: Loan): boolean => {
		newLoanError = {name: "", principal: "", interestPct: "", minPayment: ""};
		if ($loans.map((l) => l.name).includes(loan.name))
			newLoanError.name = "Loan name must be unique";
		if (loan.name.length == 0) 
			newLoanError.name = "Loan must have a name";
		if (loan.principal <= 0 || loan.principal == null)
			newLoanError.principal = "Principal must be > 0";
		if (loan.interestPct < 0 || loan.interestPct == null)
			newLoanError.interestPct = "Interest must be >= 0";
		if (loan.minPayment <= 0 || loan.minPayment == null)
			newLoanError.minPayment = "Minimum payment must be > 0";

		return Object.keys(newLoanError).reduce((total, value) => total && newLoanError[value].length == 0, true);
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
			<i
				class="icon trash alternate outline float-right"
				on:click={() => deleteLoan(i)}
			/>
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
				on:input={() => newLoanError.name = ""}
			/>
			{#if newLoanError.name}<div class="error">{newLoanError.name}</div>{/if}
			<input
				type="number"
				placeholder="Principal"
				bind:value={newLoan.principal}
				on:input={() => newLoanError.principal = ""}
			/>
			{#if newLoanError.principal}<div class="error">{newLoanError.principal}</div>{/if}
			<input
				type="number"
				placeholder="Interest %"
				bind:value={newLoan.interestPct}
				on:input={() => newLoanError.interestPct = ""}
			/>
			{#if newLoanError.interestPct}<div class="error">{newLoanError.interestPct}</div>{/if}
			<input
				type="number"
				placeholder="Minimum Payment"
				bind:value={newLoan.minPayment}
				on:input={() => newLoanError.minPayment = ""}
			/>
			{#if newLoanError.minPayment}<div class="error">{newLoanError.minPayment}</div>{/if}
			<button class="ui button" on:click={addNewLoan}> Add Loan </button>
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
		border-top: 1px solid rgba(34, 36, 38, 0.15);
	}

	.error {
		color: rgb(168, 39, 39);
		font-size: .9em;
		padding-left: 3.5px
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
