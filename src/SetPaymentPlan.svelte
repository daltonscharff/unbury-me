<script lang="ts">
    import { loans, monthlyPayment, paymentPlan } from "./stores";

    $: minimumMonthlyPayment = $loans.reduce(
        (total, loan) => total + loan.minPayment,
        0
    );
    $: maximumMonthlyPayment = $loans.reduce(
        (total, loan) => total + loan.principal,
        0
    );
    $: $monthlyPayment = minimumMonthlyPayment;
</script>

<div class="container">
    <div class="ui form">
        <div class="grouped fields">
            <div class="field">
                <div class="ui radio">
                    <label>
                        <input
                            type="radio"
                            bind:group={$paymentPlan}
                            value="avalanche"
                        />
                        Highest Interest Rate (Avalanche)
                    </label>
                </div>
            </div>
            <div class="field">
                <div class="ui radio">
                    <label>
                        <input
                            type="radio"
                            bind:group={$paymentPlan}
                            value="snowball"
                        />
                        Lowest Principal (Snowball)
                    </label>
                </div>
            </div>
        </div>
    </div>
    <p>Monthly Payment: ${$monthlyPayment}</p>
    <input
        type="range"
        bind:value={$monthlyPayment}
        min={minimumMonthlyPayment}
        max={maximumMonthlyPayment}
    />
</div>

<style>
input[type=radio] {
    margin-right: .5em;
}

input[type=range] {
    width: 100%;
}

.container {
    margin-bottom: 1em;
}
</style>
