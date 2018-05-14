// http://www.codewars.com/kata/matrix-determinant/train/javascript
console.log('matrix.js');
function determinant(m) {
  // return the determinant of the matrix passed in
  if(m.length === 1) return m[0][0];
  if(m.length === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  let sum = 0;
  m[0].forEach((c, i)=>{
    let operater = i % 2 === 0 ? 1 : -1;
    sum += determinant(getSubMatrix(m, i)) * c * operater;
  });
  return sum;
};
function getSubMatrix(m, col = 0, row = 0){
  let subm = [];
  let submRowIndex = 0;
  for(let rowIndex = 0; rowIndex < m.length; rowIndex++){
    if(rowIndex === row) continue;
    let submColIndex = 0;
    subm[submRowIndex] = [];
    for(let colIndex = 0; colIndex < m[rowIndex].length; colIndex++){
      if(colIndex === col) continue;
      subm[submRowIndex].push(m[rowIndex][colIndex]);
    }
    submRowIndex++;
  }
  return subm;
}

// test
debugger
let m1 = [ [1, 3], [2,5]];
let m2 = [ [2,5,3], [1,-2,-1], [1, 3, 4]];

var a = determinant(m1);
console.log(a);
var b = determinant(m2);
console.log(b);

// Test.assertEquals(determinant([[1]]), 1)
// Test.assertEquals(determinant(m1),-1)
// Test.assertEquals(determinant(m2),-20)