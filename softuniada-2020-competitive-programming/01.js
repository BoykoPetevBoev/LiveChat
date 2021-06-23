function solve([salary, costs, growth, carPrice, months]) {

    let totalSavings = (salary - costs) * months;
    let totalGrowth = (growth * (months - 1)) * months / 2
    let savings = totalSavings + totalGrowth

    const result = savings >= carPrice
        ? 'Have a nice ride!'
        : 'Work harder!'

    console.log(result);
}

solve([100, 50, 10, 500, 7])

solve([560.8, 600.4, 15.3, 4356.19, 24])

solve([1500, 500, 13, 25003, 22])
