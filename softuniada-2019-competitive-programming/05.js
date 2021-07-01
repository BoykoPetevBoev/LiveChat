function solve(input) {
    const n = Number(input.shift());
    const matrix = new Array(n).fill().map(() => new Array(n).fill(0));
    let [x, y] = input.shift().split(' ').map(Number);
    let coordinates = input.shift();
    let rests = 0;
    let outOfStamina = 0;

    const directions = {
        left: (x, y) => [x, --y],
        right: (x, y) => [x, ++y],
        down: (x, y) => [++x, y],
        up: (x, y) => [--x, y]
    }

    const isInMatrix = (x, y) => {
        if (0 <= x && x < n && 0 <= y && y < n)
            return true;
        return false;
    }

    const changeDirection = (destinationX, destinationY, direction, positionX, positionY) => {
        const turnLeft = {
            right: 'up',
            up: 'left',
            left: 'down',
            down: 'right'
        }
        const turnRight = {
            right: 'down',
            up: 'right',
            left: 'up',
            down: 'left'
        }
        const leftDirection = turnLeft[direction];
        const [leftX, leftY] = directions[leftDirection](positionX, positionY);

        const rightDirection = turnRight[direction];
        const [rightX, rightY] = directions[rightDirection](positionX, positionY);

        if (isInMatrix(leftX, leftY) && isInMatrix(rightX, rightY)) {
            const leftDiff = Math.abs((destinationX + destinationY) - (leftX + leftY));
            const rightDiff = Math.abs((destinationX + destinationY) - (rightX + rightY));
            console.log(leftDiff, rightDiff);
            return leftDiff <= rightDiff
                ? leftDirection
                : rightDirection
        }
        if (isInMatrix(leftX, leftY)) {
            return leftDirection;
        }
        if (isInMatrix(rightX, rightY)) {
            return rightDirection;
        }
    }

    const moveToTarget = (destinationX, destinationY, direction, stamina) => {
        let steps = 0;
        let positionX = x;
        let positionY = y;
        const isDestinationReached = positionX == destinationX && positionY == destinationY;

        while (!isDestinationReached) {
            const [newX, newY] = directions[direction](positionX, positionY);
            if (!isInMatrix(newX, newY))
                return;

            if (steps == stamina) {
                direction = changeDirection(destinationX, destinationY, direction, positionX, positionY);
                outOfStamina++;
                steps = 0;
            }


            positionX = newX;
            positionY = newY;
            matrix[positionX][positionY]++;
            steps++;

            if (positionX == destinationX && positionY == destinationY) {
                rests++;
                break;
            }
        }
        x = positionX;
        y = positionY;
    }

    while (coordinates !== 'eastern odyssey') {
        let [destinationX, destinationY, direction, stamina] = coordinates.split(' ');
        destinationX = Number(destinationX)
        destinationY = Number(destinationY)
        stamina = Number(stamina)

        moveToTarget(Number(destinationX), destinationY, direction, stamina)
        coordinates = input.shift();
    }
    console.log(rests);
    console.log(outOfStamina);
    console.log(matrix.map(arr => arr.join(' ')).join('\n'));
}

// solve(['5', '0 0', '2 2 down 2', 'eastern odyssey']);
// solve(['5', '0 0', '2 2 down 2', '4 4 right 1', 'eastern odyssey']);
solve(['7', '3 3', '5 5 left 2', '6 6 right 2', 'eastern odyssey']);