console.log("Lei de Sarrus aplicado a matrizes de ordem 3 ");

// const readline = require("readline");

// const resp = "";

// const reader = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// reader.question("Qual a orderm da matriz?\n", (answer) => {
//   const resp = answer;
//   console.log(
//     "\nA matriz '" + resp + "' foi grava com sucesso numa variável inútil"
//   );
//   for (let i = 0; i <= Math.pow(resp, 2); i++) {

//   }
//   reader.close();
// });

export const threeOrderDeterminant = (matrix: number[][]) => {
  const matrixCopy: number[][] = JSON.parse(JSON.stringify(matrix));
  for (const i of matrixCopy) {
    i.push(i[0], i[1]);
  }
  getValues(matrixCopy);
  return sumLeftSide() - sumRightSide();
};

// let matriz = [
//   [2, 1, 3],
//   [7, 5, -2],
//   [1, 3, 4],
// ];
let left: number[][] = []; // starts at top left side
let right: number[][] = []; // starts at top right  side

// repeats the two firsts columns

const sumByIdx = (idx: number, arr: number[][]) => {
  let sum = 1;
  for (const i of arr) {
    sum *= i[idx];
  }
  return sum;
};

const getValues = (matrixCopy: number[][]) => {
  right = matrixCopy.map((i: number[], idx: number) =>
    i.slice(i.length - matrixCopy.length - idx, i.length - idx)
  );
  left = matrixCopy.map((i: number[], idx: number) =>
    i.slice(idx, i.length - (matrixCopy.length - 1 - idx))
  );
};

const sumLeftSide = () => {
  let leftRes: number = 0;
  left.map(
    (_i, idx: number, arr: number[][]) => (leftRes += sumByIdx(idx, arr))
  );
  return leftRes;
};
const sumRightSide = () => {
  let rightRes: number = 0;
  right.map(
    (i, idx: number, arr: number[][]) => (rightRes += sumByIdx(idx, arr))
  );
  return rightRes;
};
