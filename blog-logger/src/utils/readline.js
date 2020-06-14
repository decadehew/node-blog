const fs = require('fs');
const path = require('path');
const readline = require('readline');

const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log');
const readStream = fs.createReadStream(fileName);
const rl = readline.createInterface({
  input: readStream
});

let chromeNum = 0;
let sum = 0;

// 監聽 line，一行一行讀取
rl.on('line', (lineData) => {
  if (!lineData) {
    return;
  }

  sum++;

  const arr = lineData.split(' -- ');
  if (arr[2] && arr[2].indexOf('Chrome') > -1) {
    chromeNum++;
  }
});

// 監聽 close，一行一行讀取完畢
rl.on('close', () => {
  console.log(`chrome 占比: ${chromeNum / sum}`);
})