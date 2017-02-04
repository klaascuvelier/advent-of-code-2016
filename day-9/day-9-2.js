const fs = require('fs');
const data = fs.readFileSync('./input.txt').toString().replace(/\s/g, '');
const log = 100000;

//test();
const decompressed = decompress(data);
console.log('decompressed', decompressed);


function decompress () {
    let { input, size } = restore();
    let string = input;

    let marker = findMarker(string);
    let i = 0

    while (marker !== null) {
        if (++i % log === 0) {
            console.log(`${string.length} compressed, ${size} decompressed`);
        }

        if (i % (100*log) === 0) {
            save(size, string);
            process.exit();
        }

        size += marker.startPos;
        string = string.substr(marker.startPos);

        string = string.replace(marker.match + marker.chars, marker.replace);
        marker = findMarker(string);
    }

    size += string.length;
    save(size, '');

    return size;

    function findMarker (string) {
        // very naive, assume there are no fake markers
        let marker = null;
        const startPos = string.indexOf('(');

        if (startPos > -1) {
            const endPos = string.indexOf(')', startPos);

            if (endPos > -1) {
                const match = string.substring(startPos, endPos + 1);
                const [length, repeat] = match.substr(1, match.length -2).split('x').map(Number);
    
                if (!isNaN(length) && !isNaN(repeat)) {
    
                    const chars = string.substr(endPos + 1, length);
                    const replace = Array(repeat).fill().map(() => chars).join('');

                    marker = { startPos, match, length, repeat, chars, replace };
                }
            }
        }
        
        return marker;
    }
}

function save (size, input) {
    fs.writeFileSync('./tmp/input.txt', input);
    fs.writeFileSync('./tmp/size.txt', size);
}

function restore () {
    const input = fs.readFileSync('./tmp/input.txt').toString();
    const size = Number(fs.readFileSync('./tmp/size.txt').toString());

    return { input, size };
}


function test () {
    [
        [ 'ADVENT', 'ADVENT' ],
        [ 'A(1x5)BC', 'ABBBBBC' ],
        [ '(3x3)XYZ', 'XYZXYZXYZ' ],
        [ 'X(8x2)(3x3)ABCY', 'XABCABCABCABCABCABCY' ]
    ].forEach(([compressed, decompressed]) => {
        const test = decompress(compressed); 
        if (test !== decompressed) {
            throw new Error(`Test case failed: "${compressed}" did not return "${decompressed}" but "${test}"`);
        }
    })

    if (decompress('(27x12)(20x12)(13x14)(7x10)(1x12)A').length !== 241920) {
        throw new Error('(27x12)(20x12)(13x14)(7x10)(1x12)A did not pass test');
    }

    if (decompress('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN').length !== 445) {
        throw new Error('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN did not pass test');
    }
}
