const input = '00111101111101000';

function growData (a) {
    const b = a
        .split('')
        .reverse()
        .map(char => {
            if (char === '1') {
                 return '😀';
            }
            else if (char === '0') {
                return '1';
            }
            return char;
        })
        .map(char => char === '😀' ? '0' : char)
        .join('');

    return `${a}0${b}`;
}

function findDataChecksum (input, length) {
    while (input.length < length) {
        input = growData(input);
    }

    input = input.slice(0, length);
    return checksum(input);
}

function checksum (data) {
    let sum = _checksum(data);

    while (sum.length % 2 === 0) {
        sum = _checksum(sum);
    }

    return sum;

    function _checksum (data) {
        let sum = ''
        for (let i = 0; i <= data.length - 2; i += 2) {
            sum += data[i] === data[i + 1] ? '1' : '0'
        }
        return sum;
    }
}

function test () {
    console.log('testing');
    const data = {
        '1': '100',
        '0': '001',
        '11111': '11111000000',
        '111100001010': '1111000010100101011110000'
    }

    Object.keys(data).forEach(key => {
        const grown = growData(key);
        if (grown !== data[key]) {
            throw new Error(`${key} did not grow to ${data[key]} but to ${grown}`);
        }
    });

    if (checksum('110010110100') !== '100') {
        throw new Error(`check sum failed`);
    }

    if (findDataChecksum('10000', 20) !== '01100') {
        throw new Error(`total fnct failed`);
    }

    console.log('test succeeded');
}

//test();
console.log(findDataChecksum(input, 272));