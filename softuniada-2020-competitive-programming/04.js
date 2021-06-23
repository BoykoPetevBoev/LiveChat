function solve(commands) {
    const [r, c] = commands.shift().split(' ');
    const matrix = commands.splice(0, r).map(str => str.split(''));
    const steps = commands.shift();
    const playerPositionCol = matrix[r - 1].indexOf('S');
    let playerPositionRow = r - 1;
    let totalJumps = 0

    const changeRow = (row, rowSteps) => {
        rowSteps = rowSteps % c
        for (let i = 0; i < rowSteps; i++) {
            const sym = matrix[row].pop();
            matrix[row].unshift(sym);
        }
    }

    const takeJump = () => {
        if (matrix[playerPositionRow - 1][playerPositionCol] !== '-') return;
        matrix[playerPositionRow - 1][playerPositionCol] = 'S';
        playerPositionRow === r - 1
            ? matrix[playerPositionRow][playerPositionCol] = '0'
            : matrix[playerPositionRow][playerPositionCol] = '-';
        playerPositionRow--;
        totalJumps++;
    }

    for (let i of commands) {
        const [row, rowSteps] = i.split(' ');
        changeRow(row, rowSteps);
        takeJump()
    }

    console.log(playerPositionRow === 0 ? 'Win' : 'Lose');
    console.log('Total Jumps: ' + totalJumps);
    console.log(matrix.map(row => row.join('')).join('\n'));
}

solve([
    '5 4', '00-0', '0-00',
    '0-00', '-000', '00S0',
    '4', '3 2', '2 1',
    '1 1', '0 0'
])
solve([
    '5 3', '00-', '-00',
    '0-0', '00-', '0S0',
    '4', '3 2', '2 0',
    '1 1', '0 2'
])
solve([
    '4 4', '00-0',
    '0-00', '00-0',
    'S000', '3',
    '2 1', '2 1',
    '1 1'
])
solve([
    '5 5', '-000-',
    '00-00', '0-0-0',
    '-000-', 'S0000',
    '2', '3 1',
    '2 2'
])
solve([
    '6 6', '0--000', '00--00',
    '000--0', '0000--', '0000--',
    '000S00', '10', '4 1',
    '3 2', '2 3', '1 4',
    '0 5', '4 3', '3 2',
    '2 2', '1 2', '0 2'
])