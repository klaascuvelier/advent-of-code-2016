const fs = require('fs');
const data = fs.readFileSync('./input.txt').toString().replace(/\s/g, '');

const decompressed = decompress(data);
console.log(decompressed.length);

function decompress (string) {
    const markerRegexp = /\((([0-9]+)x([0-9]+))\)/;

    let decompressed = [];

    while (string.length > 0) {
        const marker = string.match(markerRegexp);
    
        if (marker === null) {
            decompressed.push(string);
            string = '';
        }
        else {
            const fullMatch = marker[0];
            const length = Number(marker[2]);
            const repeat = Number(marker[3]);
            const startPos = string.indexOf(fullMatch);

            // add everything in front of the match
            decompressed.push(string.substr(0, startPos));

            // add decompressed data
            const chars = string.substr(startPos + fullMatch.length, length);
            const decChars = Array(repeat).fill().map(value => chars).join('');
            decompressed.push(decChars);

            // update string to decompress
            string = string.substr(startPos + fullMatch.length + length);
        }
    }

    return decompressed.join('');
}

function test () {
    [
        [ 'ADVENT', 'ADVENT' ],
        [ 'A(1x5)BC', 'ABBBBBC' ],
        [ '(3x3)XYZ', 'XYZXYZXYZ' ],
        [ 'A(2x2)BCD(2x2)EFG', 'ABCBCDEFEFG' ],
        [ '(6x1)(1x3)A', '(1x3)A' ],
        [ 'X(8x2)(3x3)ABCY', 'X(3x3)ABC(3x3)ABCY']
    ].forEach(([compressed, decompressed]) => {
        const test = decompress(compressed); 
        if (test !== decompressed) {
            throw new Error(`Test case failed: "${compressed}" did not return "${decompressed}" but "${test}"`);
        }
    })
}
