export default {
    or(actual, expected) {
        if(!Array.isArray(expected)) {
            throw new Error("Expected value must be a any[]");
        }
        const pass = expected.map<boolean>(
            v => v.asymmetricMatch ? v.asymmetricMatch(actual) : v === actual
        ).reduce((acc, cur) => acc || cur);
        return {
            pass,
            message: pass 
            ? () => `None of the expected values match the actual values.` 
            : () => `Either expected value matches the actual value`,
        };
    }
};
