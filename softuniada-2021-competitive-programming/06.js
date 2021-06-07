function main([wrongName, correctName]) {

    const elements = wrongName.split('');
    let operations = 0;

    for (let i = elements.length - 1; i > 1; i++) {
        recursion(elements, i);
    }

    function recursion(result, index) {
        if (result.join('') === correctName || index < 1)
            return console.log(`The minimum operations required to convert "${wrongName}" to "${correctName}" are ${operations}`);;

        for (let i = 0; i < elements.length; i++) {
            operations++;
            const char = result[index]
            result.splice(index, 1);
            result.unshift(char);
            recursion(result, index - 1);
            operations--;
        }
    }
    recursion([], 0);
}

main(['esiD', 'Desi', ''])
main(['nIva', 'Ivan', ''])
main(['ekVianor', 'Veronika', ''])
main(['aToderos', 'Teodora', ''])
console.log('test');