function solve([k, n, ...input]) {
    const elements = input.filter(a => a !== '').map(Number).sort((a, b) => a - b);
    let result = Number.MAX_VALUE;

    for (let i = k - 1; i < n; i++) {
        const min = elements[i - (k - 1)]
        const max = elements[i]
        const diff = max - min
        if(diff < result) {
            result = diff
        }
    }
    console.log(result);
}

solve([
    '3', '7', '10',
    '100', '300', '200',
    '1000', '20', '30', ''
]);
solve([
    '4', '10', '1',
    '2', '3', '4',
    '10', '20', '30',
    '40', '100', '200'
]);
solve([
    '2', '5', '1',
    '2', '1', '2',
    '1'
]);
