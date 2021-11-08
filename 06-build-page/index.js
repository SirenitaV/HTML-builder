const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, '/project-dist'), {recursive: true}, (err) => {
  if(err) {
    throw err;
  }
});

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, file) => {
  if(err) {
    console.log(err);
  }
  else {
    let template = file;
      fs.readdir(path.join(__dirname, 'components'), (err, components) => {
           if(err) {
           console.log(err);
          }
        else {
          components.forEach(component => {
            let compArr = [];
            fs.readFile(path.join(__dirname, 'components', component), 'utf-8', (err, component) => {
              if(err) {
                console.log(err);
              }
              else {
              compArr.push(component);
              
              }
              console.log(compArr.length);
              //console.log(compArr);
            })
            
             });
             
          }
         })
    }
}); 