const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
const triangles = input.split(`\n`);

const validTriangles = triangles.filter(data => isValidTriangle(data));
console.log(validTriangles.length);

function isValidTriangle (data) {
    side1 = Number(data.substr(0, 5));
    side2 = Number(data.substr(5, 5));
    side3 = Number(data.substr(10, 5));

    return (side1 + side2 > side3) && (side2 + side3 > side1) && (side1 + side3 > side2);
}