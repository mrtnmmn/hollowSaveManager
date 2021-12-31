const direction = '/home/mrtnmmn/Documents/hollowSaveManager/pruebas/hollowSaves'

const fs = require('fs')

function refresh() {
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
          console.log(file);
        });
      });
}
        
