function solve([n]){
    n = Number(n)
    const generateMatrix = (row, col) => {
        const result = [];
        for(let i = 0; i < row; i ++){
            const arr = []
            let seat = i % 4 != 0 ? 4 - i % 4 : 0 
            for(let j = 0; j < col; j++) {
                if(j == seat) {
                    arr.push('#')
                    seat += 4
                }
                else {
                    arr.push('.')
                }
            }
            result.push(arr)
        }
        return result;
    }
    const printResult = (matrix) => {
        const result = matrix.map(arr => arr.join(''))
        console.log(result.join('\n'));
    }
    const matrix = generateMatrix(n + Math.floor(n / 2), n);

    printResult(matrix)
}

solve([7])
console.log(' ');
solve(['5'])