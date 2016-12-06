const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

const room = input.split(`\n`)
    .map(extractInfo)
    .filter(room => checkRoom(room.name, room.sum))
    .map(info => Object.assign({}, info, { real: realName(info.name.toLowerCase(), info.sectorId) }))
    .filter(info => info.real.indexOf('north') > -1)
    .map(info => `${info.sectorId} :: ${info.real}`)[0]

console.log(room);


function test () {
    const data = 'qzmt-zixmtkozy-ivhz-343[abcdd]';
    const info = extractInfo(data);

    const real = realName(info.name, rotations);
    console.log('real name: ', real);
} 

function extractInfo (info) {
    const [match, name, sectorId, sum] = info.match(/([a-z\-]+)([0-9]+)\[([a-z]{5})\]/);
    const nr = parseInt(sectorId, 10);
    return { name, sectorId: nr, sum };
}

function checkRoom (name, sum) {
    const check = checksum(name);
    return sum === check;
}

function checksum (room) {
    return room
        .split('')
        .filter(char => /[a-z]/.test(char))
        .reduce((info, char) => {
            const [chars, tuples] = info;
            const index = chars.indexOf(char);

            if (index > -1) {
                tuples[index].count += 1;
            } 
            else {
                chars.push(char);
                tuples.push({ char, count: 1 });
            }

            return [chars, tuples];
        }, ([[], []]))[1]
        .sort(sortByKey)  
        .reverse()
        .slice(0, 5)
        .map(tuple => tuple.char)
        .join('');  
}

function sortByKey (item1, item2) {
    const count1 = item1.count;
    const count2 = item2.count;
    
    const name1 = item1.char;
    const name2 = item2.char;

    let result = 0;

    if (count1 > count2) {
        result = 1;
    }
    else if (count1 < count2) {
        result = -1;
    }
    else if (count1 === count2) {
        if (name1 < name2) {
            result = 1;
        }
        else if (name1 > name2){
            result = -1;
        }
    }

    return result;
}

function realName (name, rotate = 1) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    return name
        .split('')
        .map(char => {
            const index = chars.indexOf(char);

            if (index > -1) {
                return chars[((index + rotate) % 26)];
            }
            return char;
        })
        .join('')
        //.replace(/\-/g, ' ');
}

function impossibleCharCombinations (name) {
    const vowels = 'aeiouy'.split('');
    const regexp = new RegExp(`(${vowels.join('|')})`);

    return name
        .split(regexp)
        .filter(combination => combination.length > 4)
        .length > 0
}