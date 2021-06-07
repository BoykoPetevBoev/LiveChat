function main(input) {
    const numbers = input.shift().split(', ').map(n => Number(n));
    const k = Number(input.shift());
    const totalSum = numbers.reduce((a, b) => {
        return a + b
    })
    const package = totalSum / k;
    let sum = 0

    // for (let i of numbers) {
    //     recursion(i)
    // }

    // function recursion(n, sum) {
    //     if (n < package) return;

    // }
    console.log('Packaging is not possible!');
}

main(['3, 5, 1, 4, 2, 5, 2, 1, 1, 2, 4, 7, 1, 4, 6', '6', ''])
