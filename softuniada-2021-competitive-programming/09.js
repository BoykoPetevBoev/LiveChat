function main([numbersOfZero, numbersOfOnes, skip]) {
    let stop = true

    let num = 0;

    while (stop) {
        let bin = num.toString(2);

        if (bin.split('').filter(n => n == 0).length == numbersOfZero &&
            bin.split('').filter(n => n == 1).length == numbersOfOnes) {

                console.log(bin);
            if (skip > 1) {
                skip--
            }
            else {
                return console.log(bin);
            }
        }
        num += 1;
    }

    return;
}

main([2, 2, 3])
console.log('ds');
main([2, 2, 6])
