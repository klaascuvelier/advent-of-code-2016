const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
const rooms = input.split(`\n`).map(extractInfo);

const validRooms = rooms.filter(room => checkRoom(room.name, room.sum));
const sectorIds = validRooms.map(room => room.sectorId);
const sum = sectorIds.reduce((total, id) => total + Number(id), 0);

console.log(sum);

const test = {
    'aaaaa-bbb-z-y-x-123[abxyz]': true,
    'a-b-c-d-e-f-g-h-987[abcde]': true,
    'not-a-real-room-404[oarel]': true,
    'totally-real-room-200[decoy]': false
}

Object.keys(test).forEach(key => {
    const info = extractInfo(key);
    if (checkRoom(info.name, info.sum) !== test[key]) {
        console.log('Error in algorithm');
        console.log(`${key} did not pass the test:`);
        console.log(info.name);
        console.log(checksum(info.name), 'did not match expected sum', info.sum)

        throw new Error(`FAIL`);
    }
});

function extractInfo (info) {
    const [match, name, sectorId, sum] = info.match(/([a-z\-]+)([0-9]+)\[([a-z]{5})\]/);
    return { name, sectorId, sum };
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
