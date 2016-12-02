const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const dials = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const instructions = input.split(`\n`);

// const instructions = [
//     'ULL',
//     'RRDDD',
//     'LURDL',
//     'UUUUD'
// ];

const pos = { x: 1, y: 1 };
const code = [];

console.log(pos);

instructions.forEach(line => {
    line.split('').forEach(instruction => {
        switch (instruction) {
            case 'U':
                pos.y = pos.y === 0 ? 0 : pos.y - 1;
                break;

            case 'D':
                pos.y = pos.y === 2 ? 2 : pos.y + 1;
                break;

            case 'L':
                pos.x = pos.x === 0 ? 0 : pos.x - 1;
                break;

            case 'R':
                pos.x = pos.x === 2 ? 2 : pos.x + 1; 
                break;
        }

        console.log(instruction, pos);
    });

    
    console.log(dials[pos.y][pos.x])
    console.log('');

    code.push(dials[pos.y][pos.x]);
});

console.log(code.join(''));