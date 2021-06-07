function main([n, m]) {
    n = Number(n);
    m = Number(m);
    const isPrime = num => {
        for(let i = 2; i < num; i++)
          if(num % i === 0) return false;
        return num > 1;
      }
    const result = [];
    let primeNumbers = 0;
    for (let i = n; i <= m; i++){
        if(isPrime(i)) {
            result.push(i);
            primeNumbers++
        }
    }
    console.log(result.join(' '));
    console.log(`The total number of prime numbers between ${n} to ${m} is ${primeNumbers}`);
}

main([4, 34])