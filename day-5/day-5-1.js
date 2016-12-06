const crypto = require('crypto');
const input = 'abc';

//const password = findPassword('abc');
const password = findPassword('reyedfim');
console.log(password);;

function findPassword (input) {
    let index = -1;
    let hash = '';
    let password = '';

    while (password.length < 8) {
        hash = md5(`${input}${++index}`);
        if (hash.substr(0, 5) === '00000') {
            password += hash.substr(5, 1);
        } 
    }
    
    return password;
}

function md5 (input) {
    return crypto.createHash('md5').update(input).digest('hex');
}