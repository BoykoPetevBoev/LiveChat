function main(input) {
    input.pop()
    let total = 0;

    for (let line = 1; line < input.length; line += 2) {
        printBonus(input[line - 1], input[line].split(', '))
    }

    function printBonus(name, array) {
        let bonus = 0;
        for (let i = 0; i < array.length; i++) {

            let result = array.reduce((a, b, index) => {
                if (index === i) return a
                return a * b
            }, 1)

            bonus += result
        }
        total += bonus
        console.log(`${name} has a bonus of ${bonus} lv.`);
    }

    console.log(`The amount of all bonuses is ${total} lv.`);
}
main(
    ['Ivan', '5, 7, 3, 6', 'Simona', '0, 1, 2, 3, 4, 5', 'stop', '']
)

main(
    ['Moni',
        '2, 4, 3, 2, 1',
        'Gabriel',
        '8, 1, 6, 4',
        'Emma',
        '6, 1, 2, 3, 4, 5',
        'Sofia',
        '3, 4, 9, 6',
        'stop']
)