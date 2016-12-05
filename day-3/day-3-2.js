const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

// const input = `  101 301 501
//   102  302  502
//   103  303  503
//   201  401  601
//   202  402  602
//   203  403  603`;

const lines = input.split(`\n`);
const triangles = [];

for (let i = 0; i < lines.length; i += 3) {
    const sides1 = getSides(lines[i]);
    const sides2 = getSides(lines[i + 1]);
    const sides3 = getSides(lines[i + 2]);

    triangles.push([sides1[0], sides2[0], sides3[0]]);
    triangles.push([sides1[1], sides2[1], sides3[1]]);
    triangles.push([sides1[2], sides2[2], sides3[2]]);
}

function getSides (line) {
    console.log(line);
    side1 = Number(line.substr(0, 5));
    side2 = Number(line.substr(5, 5));
    side3 = Number(line.substr(10, 5));

    return [side1, side2, side3];
}

const validTriangles = triangles.filter(data => isValidTriangle(data));
console.log(validTriangles.length);

function isValidTriangle (sides) {
    const [side1, side2, side3] = sides;
    return (side1 + side2 > side3) && (side2 + side3 > side1) && (side1 + side3 > side2);
}