const fs = require('fs');
const path = require('path');

    fs.readdir(path.join(__dirname, 'project-dist'), (err) => {
        if(err) {
          console.log(err);
        }
        if(!'bundle.css') {
          console.log('There is no bundle.css');
        };
        if('bundle.css') { 
            fs.unlink(path.join(__dirname, 'project-dist', 'bundle.css'), () => {
          if (err) throw err;
        });     
       }
      
    });
        fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, styles) => {
            if(err) {
              console.log(err);
            }
            else {
              styles.forEach(style => {
              let ext = path.extname(path.join(__dirname, 'styles', style.name));
              if(style.isFile() == true && ext == '.css') {
                fs.readFile(path.join(__dirname, 'styles', style.name), 'utf-8', (err, styles) => {
                  if(err) {
                    console.log(err);          
                  }
                  else {
                  fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), styles, (err, styles) => {
                    if(err) throw err;
                   });
                  }
                });
              }
            });
          }
          });