const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const dials = [
    [null, null, 1, null, null],
    [null, 2, 3, 4, null],
    [5, 6, 7, 8, 9],
    [null, 'A', 'B', 'C', null],
    [null, null, 'D', null, null]
];

 const instructions = input.split(`\n`);

// const instructions = [
//     'ULL',
//     'RRDDD',
//     'LURDL',
//     'UUUUD'
// ];

const pos = { x: 0, y: 2 };
const code = [];

console.log(pos);

instructions.forEach(line => {
    line.split('').forEach(instruction => {
        switch (instruction) {
            case 'U':
                if (pos.y > 0 && dials[pos.y - 1][pos.x] !== null) {
                    pos.y -= 1;
                } 
                break;

            case 'D':
                if (pos.y < 4 && dials[pos.y + 1][pos.x] !== null) {
                    pos.y += 1;
                }
                break;

            case 'L':
                if (pos.x > 0 && dials[pos.y][pos.x - 1] !== null) {
                    pos.x -= 1;
                }
                break;

            case 'R':
                if (pos.x < 4 && dials[pos.y][pos.x + 1] !== null) {
                    pos.x += 1;
                } 
                break;
        }

        console.log(instruction, pos);
    });

    
    console.log(dials[pos.y][pos.x])
    console.log('');

    code.push(dials[pos.y][pos.x]);
});

console.log(code.join(''));