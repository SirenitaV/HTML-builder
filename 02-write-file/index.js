const fs = require ('fs');
const path = require ('path');
const process = require('process');

const stdin = process.stdin;
const stdout = process.stdout;
let data = '';

fs.writeFile(path.join(__dirname, 'usertext.txt'), data, 'utf-8', (err) => {
  if (err) throw err;
});

stdout.write('Hi! Please, write here anything \n');

stdin.on(('data'), (data) => {
    const exit = 'exit';
    data = data.toString().trim();
    data === exit ? (console.log('Come again next time! Goodbye!'), process.exit()) : '';
});

stdin.on('data', (data) => {
     data.toString();
     fs.appendFile(path.join(__dirname, 'usertext.txt'), data, (err) => {
      if(err) throw err;
   });
   process.on('SIGINT', () => {
     console.log('Come again next time! Goodbye!');
     process.exit();
   });
  // stdin.on(('data'), (data) => {
  //   const exit = 'exit';
  //   data = data.toString().trim();
  //   data === exit ? (console.log('Come again next time! Goodbye!'), process.exit()) : '';
  // });
})