const electron = require('electron')
const url = require('url')
const path = require('path')

const dialog = electron.dialog;

const {app, BrowserWindow, Menu} = electron
let mainWindow

let route = ''

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width:350,
        height:600
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main/mainWindow.html'),
        protocol:'file',
        slashes:true
    })) 

    mainWindow.on('closed', function(){
        app.quit()
    })

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)

    Menu.setApplicationMenu(mainMenu)
})


const mainMenuTemplate = [
    {
        label:'File',
        submenu: [
            {
                label: 'Set Route',
                click(){
                    //createAddWindow()
                    console.log(selectFolder())
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit()
                }
            }
        ]
    }
]


function selectFolder() {
    dialog.showOpenDialog({
        title:"Selecciona una carpeta",
        properties: ["openDirectory"]
    },function (folderPaths) {
        // folderPaths es un array que contiene todos los directorios seleccionados
        if(fileNames === undefined){
            console.log("No se escogio una carpeta");
            return;
        }else{
            route = folderPaths
        }
    });
}

if(process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Toools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            }, 
            {   
                role: 'reload'
            }
        ]
    })
}