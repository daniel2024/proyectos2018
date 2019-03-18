import {Response ,Request, Router} from 'express';


import plaidClient from '../plaid/clientPlaid';




class IndexRoutesPlaid{

        router:Router;
        

    constructor(){

        this.router=Router();
        this.routes();
       
        
    }
    routes(){
        this.router.post('/get_access_token',this.getTokenAcess)
     
     
  }

  getTokenAcess (  req:Request, res:Response)  {
    var ACCESS_TOKEN:string ;
    var PUBLIC_TOKEN:string;
    var ITEM_ID:string ;
    var PROCESSOR_TOKEN:string;

    PUBLIC_TOKEN = req.body.public_token
    ITEM_ID=req.body.item_id
 
  plaidClient.exchangePublicToken(PUBLIC_TOKEN, 
    function(err:any, rese:any) {
    
      ACCESS_TOKEN = rese.access_token;

      

 plaidClient.createProcessorToken(ACCESS_TOKEN, ITEM_ID, 
        'dwolla', function(err:any, resep:any) {
   
       PROCESSOR_TOKEN=resep.processor_token;
         console.log(PROCESSOR_TOKEN)
         });
   
        });
}


}
  




const indexRouter=new IndexRoutesPlaid();
indexRouter.routes();


export default indexRouter.router;