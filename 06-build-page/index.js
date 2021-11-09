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
    let result;
      fs.readdir(path.join(__dirname, 'components'), (err, components) => {
           if(err) {
           console.log(err);
          }
        else {
          components.forEach(component => {
            let part = component.split('.')[0];
            fs.readFile(path.join(__dirname, 'components', component), 'utf-8', (err, component) => {
              if(err) {
                console.log(err);
              }
              else {              
              result = template.replace(new RegExp(`\\{{${part}}}`), `${component}`);
              template = result;
                fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), result, (err, result) => {
                  if(err) throw err;
                  else{
                }
                })
              
              
              }
            
            })
            
         });
             
      }
    })
  }
});

//Copying assets

fs.mkdir(path.join(__dirname, '/project-dist/assets'), {recursive: true}, (err) => {
  if(err) {
    throw err;
  }

  if(!'/project-dist/assets') {
  fs.readdir(path.join(__dirname, '/project-dist/assets'), (err, assetscopy) => {
    if(err) {
      console.log(err);
    }
  assetscopy.forEach(file => {
  fs.unlink(path.join(__dirname, '/project-dist/assets', file), (err) => {
    if (err) throw err;
  });
 })
});
}

fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
    if(err) {
      console.log(err);
    }
    else {      
      files.forEach(folder => {
        fs.mkdir(path.join(__dirname, `/project-dist/assets/${folder}`), {recursive: true}, (err) => {
            if(err) {
              throw err;
            }
        fs.readdir(path.join(__dirname, `assets/${folder}`), (err, folderfiles) => {
          if(err) {
            console.log(err);
          }
      folderfiles.forEach(folderfile => {  
        fs.copyFile(path.join(__dirname, `assets/${folder}`, folderfile), path.join(__dirname, `/project-dist/assets/${folder}`, folderfile), (err) => {
          if (err) throw err;
        });
       });
        });
      });
      
    });
  }
});
});

//Merging styles

if(!'style.css') {
  fs.readdir(path.join(__dirname, 'project-dist'), (err) => {
  if(err) {
    console.log(err);
  }
   fs.unlink(path.join(__dirname, 'project-dist', 'style.css'), (err) => {
   if (err) throw err;
   console.log('no file to unlink');
   });
});
}

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
          fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), styles, (err, styles) => {
            if(err) throw err;
         });
        }
      });
    }
  });
}
});