const start = [1, 1];
const number = 1358;

function isWall (x, y, specialNumber) {
    const number = (x*x + 3*x + 2*x*y + y + y*y) + specialNumber;
    const binary = (number >>> 0).toString(2);
    const sumOfOnes = binary.split('').map(Number).reduce((total, number) => total + number, number);
    return sumOfOnes % 2 === 1;
}

function findRoutes (start) {
    let iterations = 0;
    const routes = [];

    _findRoutes([start]);

    return routes;

    function _findRoutes(route, level = 0) {
        const options = _getOptions(route);
        options.forEach(option => {
            const [x, y] = option;
            const newRoute = [...route, option];

            if (newRoute.length === 51) {
                routes.push(newRoute);
            }
            else {
                _findRoutes(newRoute, level + 1);
            }
        });
    }

    function _getOptions (route) {
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

                return x > 0 && y > 0 && !isWall(x, y, number) && !reenter;
            });
    }
}



let routes = findRoutes(start);
let positions  = routes
    .reduce((positions, route) => positions.concat(route))
    .filter((item, index, array) => array.indexOf(item) === index);

console.log(positions.length, routes.length);
