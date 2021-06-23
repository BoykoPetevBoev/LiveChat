function solve([map]) {
    const directions = map.split('');
    const result = [];

    const recursion = (start, elements) => {
        if (!elements.includes('*')) {
            const match = elements.join('')
            if (!result.includes(match)) {
                result.push(match)
            }
            return;
        }

        for(let i = start; i < elements.length; i++) {
            if(elements[i] === '*') {
                elements[i] = 'L';
                recursion(i, elements)
                elements[i] = 'R'
                recursion(i, elements)
                elements[i] = 'S'
                recursion(i, elements)
                elements[i] = '*'
            }
        }
    }
    recursion(0, directions)
    console.log(result.length);
    console.log(result.join('\n'));
}

solve(['LSLLRSRL', ''])
solve(['R*S*L', ''])
solve(['**RLR*', ''])