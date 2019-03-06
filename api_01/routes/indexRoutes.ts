import {Response ,Request, Router} from 'express';


import appToken from '../ dwolla_resource/client';
import { json } from 'body-parser';



class IndexRoutes{

        router:Router;

    constructor(){

        this.router=Router();
        this.routes();
    }
    //lista los clientes
    listCustomers(req:Request,res:Response) {
      appToken.auth.client()
         .then(function(appToken:any){
          appToken
        .get('customers', { limit: 10 })
        .then(res => console.log(res.body._embedded['customers']))
  
         })
  
    }
    //creo cliente
    createCustomer(req:Request,res:Response)
    //la creacion de clientes varia mediante los campos del requestbody
    {
      //campos para un cliente que solo recive
      var requestBody = {
      firstName: 'Jane',
      lastName: 'Merchant',
      email: 'jmerchant@nomail.net',
      type: 'receive-only',
      businessName: 'Jane Corp llc',
      ipAddress: '99.99.99.99'
    };
        appToken.auth.client()
       .then(function(appToken:any) {
      
        appToken
          .post('customers',requestBody)
          .then(res => console.log(res.headers.get('location')))

    })

  }
    createFounding(){
      appToken.auth.client()
      .then(function(appToken:any) {
        var customerUrl = 'https://api-sandbox.dwolla.com/customers/276153cd-4ba0-49d8-9fd7-9cf4d7d93954';

appToken
  .post(`${customerUrl}/funding-sources-token`)
  .then(function(res) {
    console.log(res.body.token); 
  });

      })
    }
    routes(){
        this.router.post('/customer/creater',this.createCustomer)
        this.router.get('/customers',this.listCustomers)
        this.router.get('/foundig',this.createFounding)
      
       
     
    
    
    
  }
  

}


const indexRouter=new IndexRoutes();
indexRouter.routes();

export default indexRouter.router;