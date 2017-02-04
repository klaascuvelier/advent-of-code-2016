const crypto = require('crypto');
const openRegexp = /[bcdef]/;

function findPath (input) {
    let x = 0;
    let y = 0;
    let path = '';

    while (x !== 3 && y !== 3) {
        [x, y, path] = _nextPos(input, x, y, path);
        console.log(x, y, path);
    }

    function _nextPos (input, x, y, path) {
        
        const options = getOptions(input + path);
console.log('options', options);
        if (options.length > 1) {
            throw new Error('more than 1 option');
        }

        const direction = options[0];

        const [newX, newY] = getNextPos(x, y)
        const newPath = path + direction;

        return [newX, newY, newPath];
    }

    function getOptions(input, level = 0) {
        console.log('get options', input);
        const hash = md5(input);
        
        return [
                openRegexp.test(hash.substr(0, 1)) ? 'U' : null,
                openRegexp.test(hash.substr(1, 1)) ? 'D' : null,
                openRegexp.test(hash.substr(2, 1)) ? 'L' : null,
                openRegexp.test(hash.substr(3, 1)) ? 'R' : null
            ]
            .filter(option => {
                const next = getNextPos(x, y, option);
                return option !== null && 
                    (level === 1 || getOptions(input + option, level + 1).length > 0) &&
                    (next[0] >= 0 && next[1] >= 0 && next[0] < 3 && next[1] < 3)
            });
    }

    function getNextPos (x, y, direction) {
        let dx = 0;
        let dy = 0;

        if (direction === 'U') {
            dy = -1;
        }
        else if (direction === 'D') {
            dy = 1;
        }
        else if (direction === 'L') {
            dx = -1;
        }
        else if (direction === 'R') {
            dx = 1;
        }

        return [x + dx, y + dy];
    }
}

function md5 (input) {
    return crypto.createHash('md5').update(input).digest('hex');
}

const path = findPath('ihgpwlah')
console.log(path);