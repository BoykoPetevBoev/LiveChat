function solve([n]) {
    n = Number(n);
    const width = n * 5;
    const height = n * 4 + 2;

    const head = Math.floor(n / 2);
    const main = width - (2 * n)
    const bottom = n + 2;
    
    const aside = "#".repeat(n);
    const mainArr = new Array(Math.floor(main / 2)).fill('#');
    const mainArrTwo = new Array(Math.floor(main / 2)).fill(' ');

    for (let i = 1; i <= height; i++) {
        if (i <= head || i > height - head) {
            console.log(" ".repeat(n) + '#'.repeat(main) + ' '.repeat(n));
            continue;
        }
        if (i > height - head - bottom) {
            (i + head) % 2 !== 0
                ? console.log(aside + ' ' + mainArr.join(' ') + ' ' + aside)
                : console.log('#'.repeat(width))
            continue;
        }
        if (i === head + 1 || i === height - head - bottom) {
            console.log(aside + ' '.repeat(main) + aside);
            continue;
        }
        (i + head) % 2 !== 0
            ? console.log(aside + ' ' + mainArrTwo.join('#') + ' ' + aside)
            : console.log(aside + ' ' + mainArr.join(' ') + ' ' + aside)
    }

}

solve([3])
solve([5])