function solve([a, b, c]) {
    const sum = Number(a) + Number(b) + Number(c)
    const numbers = [a, b, c];
    const array = new Array(3);
    const used = new Array(3).fill(false);
    const result = []

    if (!sum) {
        return console.log("No digitivision possible.");
    }

    const generate = (index) => {
        if (index === numbers.length)
            return result.push(array.join(''))

        for (let i = 0; i < numbers.length; i++) {
            if (!used[i]) {
                used[i] = true;
                array[index] = numbers[i];
                generate(index + 1);
                used[i] = false;
            }
        }
    }
    generate(0);

    const output = result.map(Number).filter(num => (num / sum) % 1 === 0).length === 0
        ? "No digitivision possible."
        : "Digitivision successful!"

    console.log(output);
}

solve(['6', '2', '1']);
solve(['3', '3', '4']);
solve(['0', '0', '0']);