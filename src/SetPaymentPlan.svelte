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
<p>monthly payment: {$monthlyPayment}</p>
<input
    type="range"
    bind:value={$monthlyPayment}
    min={minimumMonthlyPayment}
    max={maximumMonthlyPayment}
/>

<style>
input[type=radio] {
    margin-right: .5em;
}
</style>
