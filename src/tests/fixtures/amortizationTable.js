const single = {
    "amortizationTable": [[{ "amountPaid": { "toInterest": 10, "toPrinciple": 490, "total": 500 }, "id": "loan1", "remainingBalance": 1510 }], [{ "amountPaid": { "toInterest": 8, "toPrinciple": 492, "total": 500 }, "id": "loan1", "remainingBalance": 1018 }], [{ "amountPaid": { "toInterest": 5, "toPrinciple": 495, "total": 500 }, "id": "loan1", "remainingBalance": 523 }], [{ "amountPaid": { "toInterest": 3, "toPrinciple": 497, "total": 500 }, "id": "loan1", "remainingBalance": 26 }], [{ "amountPaid": { "toInterest": 0, "toPrinciple": 26, "total": 26 }, "id": "loan1", "remainingBalance": 0 }]], "monthsUntilPayoff": 5, "totalInterestPaid": 26
};

const multiple = {
    "amortizationTable": [[{ "amountPaid": { "toInterest": 10, "toPrinciple": 910, "total": 920 }, "id": "loan3", "remainingBalance": 1090 }, { "amountPaid": { "toInterest": 2, "toPrinciple": 3, "total": 5 }, "id": "loan2", "remainingBalance": 497 }, { "amountPaid": { "toInterest": 3, "toPrinciple": 7, "total": 10 }, "id": "loan1", "remainingBalance": 993 }], [{ "amountPaid": { "toInterest": 5, "toPrinciple": 915, "total": 920 }, "id": "loan3", "remainingBalance": 175 }, { "amountPaid": { "toInterest": 2, "toPrinciple": 3, "total": 5 }, "id": "loan2", "remainingBalance": 494 }, { "amountPaid": { "toInterest": 3, "toPrinciple": 7, "total": 10 }, "id": "loan1", "remainingBalance": 986 }], [{ "amountPaid": { "toInterest": 1, "toPrinciple": 175, "total": 176 }, "id": "loan3", "remainingBalance": 0 }, { "amountPaid": { "toInterest": 2, "toPrinciple": 494, "total": 496 }, "id": "loan2", "remainingBalance": 0 }, { "amountPaid": { "toInterest": 3, "toPrinciple": 260, "total": 263 }, "id": "loan1", "remainingBalance": 726 }], [{ "amountPaid": { "toInterest": 0, "toPrinciple": 0, "total": 0 }, "id": "loan3", "remainingBalance": 0 }, {
        "amountPaid": {
            "toInterest": 0,
            "toPrinciple": 0, "total": 0
        }, "id": "loan2", "remainingBalance": 0
    }, { "amountPaid": { "toInterest": 2, "toPrinciple": 726, "total": 728 }, "id": "loan1", "remainingBalance": 0 }]], "monthsUntilPayoff": 4, "totalInterestPaid": 33
};

export default { single, multiple };