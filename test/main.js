const { app, BrowserWindow } = require('electron');

let main;

app.on('ready', () => {

  main = new BrowserWindow();

  main.loadURL('http://127.0.0.1:3000');

  main.on('ready-to-show', () => {
    main.show();
  });

});