function solve(input) {
    const n = Number(input.shift());
    const matrix = new Array(n).fill(new Array(n).fill(0));
    let [x, y] = input.shift().split(' ').map(Number);
    let coordinates = input.shift();

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
        if (isInMatrix(leftX, leftY)) {
            return leftDirection;
        }

        const rightDirection = turnRight[direction];
        const [rightX, rightY] = direction[rightDirection](positionX, positionY);
        if (isInMatrix(rightX, rightY)) {
            return rightDirection;
        }
    }

    const moveToTarget = (destinationX, destinationY, direction, stamina) => {
        let steps = 0;
        let positionX = x;
        let positionY = y;

        while (positionX == destinationX && positionY == destinationY) {

            if (steps == stamina) {
                direction = changeDirection(destinationX, destinationY, direction, positionX, positionY);
                steps = 0;
            }

            const [newX, newY] = directions[direction](positionX, positionY);
            if (!isInMatrix(newX, newY))
                return;

            positionX = newX;
            positionY = newY;
            matrix[positionX][positionY]++;
            steps++;

        }
    }

    while (coordinates !== 'eastern odyssey') {
        const [destinationX, destinationY, direction, stamina] = coordinates.split(' ');

        moveToTarget(destinationX, destinationY, direction, Number(stamina))

        coordinates = input.shift();
    }

    console.log(matrix);
}

solve(['5', '0 0', '2 2 down 2', '4 4 right 1', 'eastern odyssey']);
// solve(['7', '3 3', '5 5 left 2', '6 6 right 2', 'eastern odyssey']);