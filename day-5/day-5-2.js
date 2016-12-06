const crypto = require('crypto');
const input = 'abc';

//const password = findPassword('abc');
const password = findPassword('reyedfim');
console.log(password);

function findPassword (input) {
    let index = -1;
    let hash = '';
    let charCount = 0
    let password = [null, null, null, null, null, null, null, null];

    while (password.filter(char => char === null).length > 0) {
        hash = md5(`${input}${++index}`);

        if (hash.substr(0, 5) === '00000') {
            const pos = hash.substr(5, 1);
            const char = hash.substr(6, 1); 

            if (pos >= 0 && pos <= 7 && password[pos] === null) {
                charCount++;
                password[pos] = char;
                console.log(hash, pos, char);
            }
        }
    }
    
    return password.join('');
}

function md5 (input) {
    return crypto.createHash('md5').update(input).digest('hex');
}