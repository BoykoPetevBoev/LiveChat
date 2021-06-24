function solve([n, ...input]) {
    input.length = Number(n);

    const elements = input.map(elem => elem.split(' '));
    const result = [];

    const flipElement = (index) => {
        return elements[index].reverse();
    }
    const swapElements = (index, i) => {
        const elem = elements[index]
        elements[index] = elements[i]
        elements[i] = elem;
    }

    const recursion = (index) => {
        if (index == elements.length) {
            result.push(elements.map(arr => `|${arr[0]}-${arr[1]}|`).join(' # '));
            return;
        }
        for (let i = index; i < elements.length; i++) {

            swapElements(index, i)
            recursion(index + 1);
            flipElement(index)
            recursion(index + 1);
            flipElement(index)
            swapElements(index, i)

        }
    }
    recursion(0)

    const unique = [...new Set(result)]

    console.log(unique.length);
    console.log(unique.sort((a, b) => a.localeCompare(b)).join('\n'));
}

solve(['3', '2 3', '2 2', '3 2', '']);

