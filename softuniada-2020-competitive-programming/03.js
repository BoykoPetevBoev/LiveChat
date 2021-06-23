function solve([num, string]) {
    const numbers = string.split(' ')
    const n = Number(num)
    const createArray = (n) => {
        const result = [];
        for (let i = 1; i <= n; i++) {
            result.push(i)
        }
        return result;
    }
    const splitAndMix = (index, arr) => {
        if(index <= 1|| index >= arr.length) return arr
        const result = []
        let half = arr.splice(0, index);
        while(arr.length > 0 && half.length > 0) {
            result.push(half.shift())
            result.push(arr.shift())
        }        
        return [...result, ...half, ...arr]
    }
    let array = createArray(n)
    for (let i of numbers) {
        array = splitAndMix(i, array)
    }
    console.log(array.join(' '));
}

solve(['5', '3 3 2'])
