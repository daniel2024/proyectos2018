import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import indexRouter from './routes/indexRoutes';
//import client from './ dwolla_resource/client';


class Server{

      app:express.Application;
  constructor(){
    this.app=express();


    this.app.use(express.json())//el tranformado de json va antes de la config
    this.app.use(express.urlencoded({extended:false}));
    this.app.use(express.static('/public'))
    this.app.use(express.static('public'));
    this.config();
    this.routes();

  }
  config(){
  //settings
  this.app.set('port',process.env.PORT || 5000);
  //midelware
  this.app.use(morgan('dev'));
  this.app.use(helmet())
   }
  routes(){

    this.app.use('/', indexRouter);

   
  }
  start(){
    this.app.listen(this.app.get('port'),() =>{
      console.log('server on port 5000')
    

    })
  }
}

const server = new Server;
server.start();