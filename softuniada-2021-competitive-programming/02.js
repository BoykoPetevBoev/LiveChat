function main(num) {

    for (let i = num; i > 0; i--) {
        const result = [i];
        for (let j = i- 1; j > 0; j--) {
            result.push(j)
            result.unshift(j)
        }
        console.log(result.join(''));
    }
}
main(7)