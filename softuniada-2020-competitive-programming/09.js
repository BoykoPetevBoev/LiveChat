function solve(input) {
    let target = Number(input.shift());
    let usedCoins = 0;
    const result = []

    for (let i = 0; i < 100; i++) {
        result[i] = i;
    }
    for (let i = 10; i < 100; i++) {
        result[i] = Math.min(result[i - 10] + 1, result[i]);
    }
    for (let i = 25; i < 100; i++) {
        result[i] = Math.min(result[i - 25] + 1, result[i]);
    }

    while (target > 0) {
        usedCoins += result[target % 100];
        target = Math.floor(target / 100);
    }
    console.log(usedCoins);
}

solve([39]);
solve([8]);
solve([30]);
solve([2772788690199]);