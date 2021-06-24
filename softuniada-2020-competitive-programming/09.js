function solve(input) {
    let target = Number(input.shift());
    const validCoins = [1, 10, 25, 100, 1000, 2500, 10000, 100000, 250000, 1000000, 10000000, 25000000 ];
    let usedCoins = 0;
    let coinIndex = validCoins.length - 1;
    
    while(target > 0 && coinIndex >= 0) {
        const currentCoin = validCoins[coinIndex]

        if(currentCoin > target) {
            coinIndex--;
            continue;
        }

        target -= currentCoin;
        usedCoins++;
    }
    console.log(usedCoins);

}

solve([39]);
solve([8]);
solve([30]);
solve([2772788690199]);