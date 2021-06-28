function solve(input) {
    let firstArray = input.shift().split(' ').map(Number);
    let secondArray = input.shift().split(' ').map(Number);
    let pairs = input.shift();

    const calculateNexus = (FA, FB, SA, SB) => {
        const nexus = firstArray[FA] + firstArray[FB] + secondArray[SA] + secondArray[SB];
        firstArray = [...firstArray.slice(0, FA), ...firstArray.slice(++FB)].map(num => num + nexus);
        secondArray = [...secondArray.slice(0, SA), ...secondArray.slice(++SB)].map(num => num + nexus);
    }

    while (pairs !== 'nexus') {
        const [[FA, SB], [FB, SA]] = pairs.split('|').map(pair => pair.split(':'));

        if (!firstArray[FA] || !firstArray[FB] || !secondArray[SA] || !secondArray[SB]) {
            pairs = input.shift();
            continue;
        }

        if (FA < FB && SA < SB)
            calculateNexus(FA, FB, SA, SB);

        if (FA > FB && SA > SB)
            calculateNexus(FB, FA, SB, SA);

        pairs = input.shift();
    }

    console.log(firstArray.join(', '));
    console.log(secondArray.join(', '));
}

// solve(['1 2 3 4 5 6 7 8 9 10', '1 2 3 4 5 6 7 8 9 10', '2:5|5:2', 'nexus']);
solve(['1 2 3 4 5 6 7 8 9 10', '1 2 3 4 5 6 7 8 9 10', '5:1|2:4', 'nexus']);
// solve([ '1 2 3 4 5 6', '1 2 3 4 5 6 7 8 9 10', '1:5|2:2', 'nexus' ]);
// solve(['5 10 15 20 25 30', '40 35 30 25 20 15 10 5', '1:6|2:1', 'nexus']);
// solve([ '9 5 10 4 5 6 7 10', '3 3 3 4 5 6 7 8', '0:1|1:0', 'nexus' ]);