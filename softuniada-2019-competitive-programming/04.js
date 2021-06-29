function solve(input) {
    const n = Number(input.shift());
    const matrix3D = new Array(n);
    const morph = {
        W: 'E',
        E: 'F',
        F: 'A',
        A: 'W',
        '0': '0'
    }

    const fillMatrix = (arr, index) => {
        if (!matrix3D[index])
            matrix3D[index] = [];
        return matrix3D[index].push(arr);
    }

    for (let i = 0; i < n; i++) {
        input.shift()
            .split(' | ')
            .map(str => str.split(' '))
            .map(fillMatrix);
    }

    let coordinates = input.shift();
    while (coordinates !== 'Melolemonmelon') {
        const [X, Y, Z] = coordinates.split(' ').map(Number);
        matrix3D[X][Y][Z] = '0';

        for (let x = 0; x < n; x++) {
            for (let y = 0; y < n; y++) {
                for (let z = 0; z < n; z++) {
   
                    if (
                        X == x && Y == y && Z - 1 == z ||
                        X == x && Y == y && Z + 1 == z ||
                        X == x && Y + 1 == y && Z == z ||
                        X == x && Y - 1 == y && Z == z ||
                        X - 1 == x && Y == y && Z == z ||
                        X + 1 == x && Y == y && Z == z
                    ) continue;

                    matrix3D[x][y][z] = morph[matrix3D[x][y][z]]
                }
            }
        }
        coordinates = input.shift();
    }

    for (let i = 0; i < n; i++) {
        const row = [];
        matrix3D.map(matrix => row.push(matrix[i].join(' ')))
        console.log(row.join(' | '));
    }
}

solve([
    '3',
    'W W W | E W A | E E E',
    'F F F | F A F | W W W',
    'A A A | A E A | A A A',
    '1 1 1',
    'Melolemonmelon'
]);
solve([
    '4',
    'A W F A | W W W W | W W W W | A A A A',
    'W F W F | F F F F | A A A A | F F F F',
    'A W E W | E E E E | A A A A | W E E W',
    'A F W E | W W W W | W W W W | W W W W',
    '1 1 1',
    '2 3 2',
    '3 1 3',
    'Melolemonmelon'
]);