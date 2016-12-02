const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input-1.txt`).toString(); 
const data = input.split(', ');
const actionRegex =  /^(L|R)([0-9]+)$/;

//data = 'R8, R4, R4, R8'.split(', ');

const DIRECTIONS = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};

const { first, visits } = data.reduce((state, action) => {
    const info = action.match(actionRegex);

    if (info === null) {
        throw new Error(`Action did not match regexp: ${action}`);
    }

    const turn = info[1];
    const moves = Number(info[2]);

    const d = (4 + state.d + (turn === 'L' ? -1 : 1)) % 4; 

    const dh = (d === DIRECTIONS.RIGHT ? 1 : (d === DIRECTIONS.LEFT ? -1 : 0));
    const dv = (d === DIRECTIONS.UP ? 1 : (d === DIRECTIONS.DOWN ? -1 : 0));

    let visits = state.visits;
    let first = state.first;
    let v = state.v;
    let h = state.h;

    for (let i = 0; i < moves; i++) {
        h += dh;
        v += dv; 

        const visit = `${v}/${h}`;
        first = visits.indexOf(visit) > -1 && first === null ? visit : first;

        visits.push(visit); 
    }
         
    return Object.assign(state, { h, v, d, visits, first });
}, { h: 0, v: 0, d: DIRECTIONS.UP, visits: [`0/0`], first: null });

const distance = first.split('/').map(Number).reduce((total, value) => total + value, 0);

console.log(distance);