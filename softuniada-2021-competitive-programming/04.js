function main(input) {

    const [rows, cols] = input.shift().split(' ');
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix.push(input.shift().split(' '));
    }
    const mark = input.shift()
    const [x, y] = input.shift().split(' ')
    const symbol = matrix[x][y]


    const isExit = (row, col) => matrix[row][col] === mark && matrix[row - 1][col];

    const isInvalid = (row, col) => isOut(row, col) || isWall(row, col) || isVisited(row, col);
    const isOut = (row, col) => row < 0 || row >= rows || col < 0 || col >= cols;
    const isWall = (row, col) => {
        return matrix[row][col] !== symbol
    };
    const isVisited = (row, col) => matrix[row][col] === mark;

    const markArea = (row, col) => matrix[row][col] = mark;

    const findEgg = (row, col) => {
        if (isInvalid(row, col)) return;

        markArea(row, col);
        findEgg(row + 1, col);
        findEgg(row - 1, col);
        findEgg(row, col + 1);
        findEgg(row, col - 1);
        markArea(row, col, mark);
    }
    findEgg(Number(x), Number(y), '')

    console.log(matrix.map(line => line.join('')).join('\n'));
}
main([
    '5 6',
    's s u u s s',
    's u s s u s',
    'u s s s s u',
    's u s s u s',
    's s u u s s',
    'i', '2 1',
    ''
])
main([
    '5 3', 
    'a a a',
    'a a a', 
    'a b a',
    'a b a', 
    'a b a',
    'x', 
    '2 1',
    ''
])