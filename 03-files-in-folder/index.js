const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
    console.log('\nCurrent directory files: ');
    if(err) {
      console.log(err);
    }
    else {
      files.forEach(file => {
        const filesPaths = [];
        file.isFile() == true ? filesPaths.push(path.join(__dirname, 'secret-folder', file.name)): '';
        for (let i = 0; i < filesPaths.length; i ++) {
          let size;
          fs.stat(filesPaths[i], (err, stats) => {
            size = stats.size;
            if(!file.isFile()) {
            }
          console.log(path.parse(filesPaths[i]).name, ' - ', path.extname(filesPaths[i]), ' - ', size + 'b');  
        });
      };
    })
  }
});