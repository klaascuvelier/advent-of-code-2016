const testData = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`;

//const data = testData.split(`\n`);
const fs = require('fs');
const data = fs.readFileSync('./input.txt').toString().split(`\n`);
const charMap = Array(data[0].length).fill(0).map(() => ({}));

const password = data
    .reduce((info, line) => {
        line
            .split('')
            .forEach((char, index) => {
                if (!info[index].hasOwnProperty(char)) {
                    info[index][char] = 1;
                }
                else {
                    info[index][char]++;                    
                }
            });

            return info;
    }, charMap)
    .map(info => {
        const mostFrequent = { char: null, count: Number.MAX_VALUE };
        Object.keys(info).forEach(char => {
            if (info[char] < mostFrequent.count) {
                mostFrequent.char = char;
                mostFrequent.count = info[char];
            }
        });
        return mostFrequent.char;
    })
    .join('');

console.log(password);