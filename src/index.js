const express = require('express');
const app = express();
const morgan=require('morgan');
const path=require('path');

//conect base de datos
const {Mongoose}= require ('./database')
//setings
app.set('port',process.env.PORT || 4000)
//middlewares
app.use(morgan('dev'));
app.use(express.json());
//routes
app.use('/api/tasks',require('./routes/task.routes'))

//Stattic final
app.use(express.static(path.join(__dirname,'public')));

//configuracon del servidor
app.listen(app.get('port'),()=> {
  console.log(`server on port ${app.get('port')}`);
});