//#region IMPORTAÇÕES
require('dotenv').config();
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();
const morgan = require('morgan');
//#endregion

//#region MIDWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
//#endregion

//#region DEFINIÇÕES
app.use(require('./routers.js'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
//#endregion

//#region ROTA PRINCIPAL
app.use('/', (req, res) => {
  res.render('index.html');
});
//#endregion

//#region INICIANDO O SERVIDOR
app.listen(process.env.PORT, () => {
  console.log('Ouvindo a porta: ', process.env.PORT);
});
//#endregion
