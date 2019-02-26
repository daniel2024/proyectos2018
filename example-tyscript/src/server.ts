import express  from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors'; 
import indexRoutes from '../routers/index.Routes';
import postRoutes from '../routers/PostRoutes';
import userRoutes from '../routers/UserRoutes';
import mongoose from 'mongoose';
import compression from 'compression';



class Server {

    public  app: express.Application;
 constructor(){
    this.app=express();

    //midelware
    this.app.use(express.json())//el tranformado de json va antes de la config
    this.app.use(express.urlencoded({extended:false}));
    this.config();
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());
    
    
 }

  
 config(){

   const MONGO_URI='mongodb://localhost/ts';
   mongoose.set('useFindAndModify',true);
   mongoose.connect(MONGO_URI || process.env.MONGO_URI,{
      useNewUrlParser:true,
      useCreateIndex:true
   })
   .then(db=> console.log('db is conect'));
   //setings
    this.app.set('port',process.env.PORT || 3000);

    //midalware
    this.app.use(morgan('dev'));

    this.routes();
 }

 routes(){

   this.app.use(indexRoutes);
   this.app.use('/api/posts',postRoutes);
   this.app.use('/api/user',userRoutes);

 }

 start(){

    this.app.listen(this.app.get('port'),() =>{
        console.log('server on port',this.app.get('port'));
    })
 
 }
}

const server =new Server();
server.start();