const start = [1, 1];
const end = [31, 39];
const number = 1358;

//const end = [7, 4]
//const number = 10;

columns = end[0] + 20;
rows = end[1] + 20;
//const columns = process.stdout.columns / 2;
//const rows = process.stdout.rows -3;


function isWall (x, y, specialNumber) {
    const number = (x*x + 3*x + 2*x*y + y + y*y) + specialNumber;
    const binary = (number >>> 0).toString(2);
    const sumOfOnes = binary.split('').map(Number).reduce((total, number) => total + number, number);
    return sumOfOnes % 2 === 1;
}

function findRoutes (start, end) {
    let iterations = 0;

    const routes = [];
    const [endX, endY] = end;

    _findRoutes([start]);

    return routes;

    function _findRoutes(route, level = 0) {
        const options = _getOptions(route, end);
        options.forEach(option => {
            const [x, y] = option;
            const newRoute = [...route, option];

            if (x === endX && y === endY) {
                routes.push(newRoute);
            }
            else {
                _findRoutes(newRoute, level + 1);
            }
        });
    }

    function _getOptions (route, end) {
        const [x, y] = route[route.length - 1];

        // For options to start, 
        // Remove invalid positions (negative pos)
        // Remove walls
        // Don't go back
        return [
                [ x - 1, y ],
                [ x + 1, y ],
                [ x, y - 1],
                [ x, y + 1]
            ].filter(option => {
                const [x, y] = option;
                const reenter = route.filter(([xo, yo]) => xo === x && yo === y).length > 0

                return x > 0 && y > 0 && !isWall(x, y, number) && !reenter && x < columns && y < end[1] + rows;
            });
    }
}

function printRoute (route) {
    const charWall = '\033[41m  \033[0m';;
    const charPath =  '\033[42m  \033[0m';
    const charPoint = '\033[102m  \033[0m';
    const charEmpty = '  ';

    const lines = [];

    let maxX = columns;
    let maxY = rows;
    let perX = {};

    route.forEach(([x, y]) => {
        if (!perX.hasOwnProperty(x)) {
            perX[x] = [];
        }

        perX[x].push(y);
    })


    for (let y = 0; y <= maxY; y++) {
        let line = '';
        for (let x = 0; x <= maxX; x++) {
            const wall = isWall(x, y, number);
            const startOrEnd = (x === start[0] && y === start[1]) || (x === end[0] && y === end[1]);

            const char = wall 
                ? charWall 
                : startOrEnd
                    ? charPoint
                    : perX.hasOwnProperty(x) && perX[x].indexOf(y) > -1 
                        ? charPath 
                        : charEmpty;

            line += char;
        }
        lines.push(line);
    }

    console.log(lines.join(`\n`) + `\n`);
}

let routes = findRoutes(start, end);
//routes.forEach(route => printRoute(route));
let routeLengths = routes.map(route => route.length);
let shortest = Math.min(...routeLengths);
console.log('shortest route is', shortest - 1, 'steps');