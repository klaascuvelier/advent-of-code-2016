const fs = require('fs');
const data = fs.readFileSync('./input.txt').toString().split(`\n`);

const abaRegexp = /([a-z])([a-z])(\1)/g
//console.log(data.filter(supportsSSL).length);
test();

function test () {
    const tests = {
        // 'aba[bab]xyz': true,
        // 'xyx[xyx]xyx': false,
        // 'aaa[kek]eke': true,
        'zazbz[bzb]cdb': true,
        // 'aaa[aaa]aaa': false,
        // 'xeu[bab]aba': true,
        // 'abc[axyxayxy]': false 
    }

    Object.keys(tests).forEach(key => {
        if (supportsSSL(key) !== tests[key]) {
            throw new Error(`${key} did not pass test`);
        }
    });
}


function supportsSSL (ip) {
    while (abaMatch = abaRegexp.exec(ip)) {
        const diffChars = abaMatch[1] !== abaMatch[2];
        const squareRegexp = new RegExp('\\[([^\\]]*)' + abaMatch[0] + '([^\\]]*)\\]');
        const notInSquares = squareRegexp.test(ip) !== true 
        const hasInverse = ip.indexOf(abaMatch[2] + abaMatch[1] + abaMatch[2]) > -1;

        console.log(abaMatch, squareRegexp);
        //console.log(ip, diffChars, notInSquares, hasInverse, squareRegexp)
        if (diffChars && notInSquares && hasInverse) {
            return true;
        }   
    }    
    
    return false;
}