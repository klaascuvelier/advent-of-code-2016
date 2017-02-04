const fs = require('fs');
const data = fs.readFileSync('./input.txt').toString().split(`\n`);

const abbaRegexp = /([a-z])([a-z])(\2)(\1)/;
const squareAbbaRegexp = /\[[^\]]*([a-z])([a-z])(\2)(\1)[^\]]*\]/;

console.log(data.filter(supportsTSL).length);

function test () {
    const tests = {
        'abba[mnop]qrst': true,
        'abcd[bddb]xyyx': false,
        'aaaa[qwer]tyui': false,
        'ioxxoj[asdfgh]zxcvbn': true,
        'abba[aaaa]dd': true,
        'abba[zabbaz]dd': false,
        'abba[zabbaz]dd[zabbaz]': false,
        'aaaa[aaaaa]ddxyyx': true,
    }

    Object.keys(tests).forEach(key => {
        if (supportsTSL(key) !== tests[key]) {
            throw new Error(`${key} did not pass test`);
        }
    });
}

function supportsTSL (ip) {
    let squareAbbaMatch = ip.match(squareAbbaRegexp);

    while (squareAbbaMatch !== null) {
        if (squareAbbaMatch[1] !== squareAbbaMatch[2]) { 
            // square abba match found, not isAbba
            return false;
        }

        ip = ip.replace(squareAbbaMatch[0], '');
        squareAbbaMatch = ip.match(squareAbbaRegexp);
    }

    let abbaMatch = ip.match(abbaRegexp);
    
    while (abbaMatch !== null) {
        if (abbaMatch[1] !== abbaMatch[2]) {
            // valid abba match found, isAbba
            return true;
        }

        ip = ip.replace(abbaMatch[0], '');
        abbaMatch = ip.match(abbaRegexp);
    }

    return false;
}