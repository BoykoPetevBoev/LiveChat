function solve(input) {
    const length = Number(input.shift());
    const D = Number(input.shift());
    const L = Number(input.shift());
    const U = Number(input.shift());
    const rest = length - D - L - U
    const M = 1000000007;

    const numbers = D === 0 ? 0 : Math.pow(10, D);
    const lowerCase = L === 0 ? 0 : Math.pow(30, L);
    const upperCase = U === 0 ? 0 : Math.pow(30, U);
    const restSym = rest === 0 ? 0 : Math.pow(70, rest);

    const factorial = (n) => {
        if (n <= 1)
            return 1;
        return n * factorial(n - 1);
    }

    if (D + L + U > length) {
        return console.log(0);
    }
    if (numbers && !lowerCase && !upperCase && !rest) {
        return console.log(numbers);
    }
    if (!numbers && lowerCase && !upperCase && !rest) {
        return console.log(lowerCase);
    }
    if (!numbers && !lowerCase && upperCase && !rest) {
        return console.log(upperCase);
    }
    if (!numbers && !lowerCase && !upperCase && rest) {
        return console.log(rest);
    }

    // const result = factorial(1) * numbers * Math.pow(30, L) * Math.pow(30, U) * Math.pow(70, rest);
    // console.log(result);
    // console.log(factorial(7) + factorial(3) + factorial(3));
}

solve([2, 2, 0, 0]);
solve([3, 1, 1, 1]);
solve([10, 4, 4, 4]);
solve([10, 3, 1, 3]);
solve([2, 1, 0, 0]);