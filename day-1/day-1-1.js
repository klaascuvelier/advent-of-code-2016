const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input-1.txt`).toString(); 
const data = input.split(', ');
const actionRegex =  /^(L|R)([0-9]+)$/;

// data = 'R2, L3'.split(', ');
// data = 'R2, R2, R2'.split(', ');
// data = 'R5, L5, R5, R3'.split(', ');

const DIRECTIONS = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};

const { h, v } = data.reduce((state, action) => {
    const info = action.match(actionRegex);

    if (info === null) {
        throw new Error(`Action did not match regexp: ${action}`);
    }

    const turn = info[1];
    const moves = Number(info[2]);

    const d = (4 + state.d + (turn === 'L' ? -1 : 1)) % 4; 
    const dh = (d === DIRECTIONS.RIGHT ? 1 : (d === DIRECTIONS.LEFT ? -1 : 0)) * moves;
    const dv = (d === DIRECTIONS.UP ? 1 : (d === DIRECTIONS.DOWN ? -1 : 0)) * moves;

    const h = state.h + dh;
    const v = state.v + dv;

    return Object.assign(state, { h, v, d });
}, { h: 0, v: 0, d: DIRECTIONS.UP });

console.log(Math.abs(h) + Math.abs(v));