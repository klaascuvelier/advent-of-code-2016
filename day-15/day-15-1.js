const regexp = /has\s([0-9]+).*position\s([0-9]+)/
const fs = require('fs')
const input = fs.readFileSync('./input.txt')
    .toString()
    .split(`\n`)
    .map(data => {
        const matches = data.match(regexp);
        const [full, positions, zero ] = matches.map(Number);

        return { positions, zero };
    })

function canFallThrough (discs, pushTime) {

    for (let i = 0; i < discs.length; i++) {
        pushTime++;
        const disc = discs[i]; 
        const position = (pushTime + disc.zero) % disc.positions; 

        if (position !== 0) {
            return false;
        }
    }

    return true;
}

function test () {
    let discs = [
        { positions: 5, zero: 4 },
        { positions: 2, zero: 1 }
    ];

    if (findPosition(discs) !== 5) {
        throw new Error('Test failed');
    }
}

function findPosition (discs) {
    let position = 0; 
    while (canFallThrough(discs, position) === false) {
        position++;
    }

    return position;
}

//test();
const position = findPosition(input);
console.log('found', position);