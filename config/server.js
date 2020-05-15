/* importar modulo do framework express */
var express = require('express');

/* importar modulo consign */
var consign = require('consign');

/* importar o body parser */
var bodyParser = require('body-parser');

/* importar express validator */
var expressValidator = require('express-validator');

/* iniciar o objeto express */
var app = express();

/* setar as variaveis 'view-engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware e express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express.validator */

app.use(expressValidator());

/* efetua o auto load das rotas, models e dos controllers para o objeto app */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;