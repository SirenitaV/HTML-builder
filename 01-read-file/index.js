const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

fs.readFile(path.join(__dirname, 'text.txt'), 'utf-8', (err, data) => {
  if (err) throw error;
  stdout.write(data);
}
);