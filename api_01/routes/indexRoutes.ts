import { Response, Request, Router } from 'express';

import plaidToken from '../plaid/PlaidToken'
import appToken from '../ dwolla_resource/client';
import { json } from 'body-parser';
import DwollaClient from '../ dwolla_resource/DwollaClient';


class IndexRoutes {

  router:Router;


  constructor() {

    this.router = Router();
    this.routes();


  }
  //lista los clientes
 async listCustomers(req: Request, res: Response) {
  
    res.send(await DwollaClient.getClients());

  }
  //obtengo cliente por email
  async getCustomer(req: Request, res: Response) {
  
    res.send(await DwollaClient.getClientByEmail(req.body.email));

  }

  //creo cliente
 async createCustomer(req: Request, res: Response)
  //la creacion de clientes varia mediante los campos 
  //que recibe del front
  {
    //campos para un cliente que solo recive
    
   res.send(await DwollaClient.clientCreate(req.body))

  }


  async createFounding(req: Request, res: Response) {
    //----------------Plaid----------------------
   /*
    var ACCESS_TOKEN: string;
    var PUBLIC_TOKEN: string;
    var ITEM_ID: string;
    
    req.body.public_token
    ITEM_ID = req.body.item_id
    var ACCOUNT_DATA:any;
*/ 

//        ACCOUNT_DATA= await IndexRoutes.dataAccount(ACCESS_TOKEN,ITEM_ID);

    console.log(await DwollaClient.getClientByEmail('julio_perez@gmail.com')_);

    console.log(await plaidToken.getToken(req.body.public_token,req.body.item_id))
          /*  var requestBody = await {
           
            'name':'prueba',// ACCOUNT_DATA.name,
            'plaidToken': PROCESSOR_TOKEN

          };

           appToken.auth.client()
          .then(appToken => appToken.post(`${customerUrl}/funding-sources`, requestBody)
          .then(res => console.log(res.headers.get('location'))))
*/
    }
    

  
  

  makeTranfer() {

    var tranfer = {
      "_links": {
        "source": {
          "href": "https://api-sandbox.dwolla.com/funding-sources/68ccc7bc-501f-4de0-b2ec-8acc58653d3f"
        },
        "destination": {
          "href": "https://api-sandbox.dwolla.com/funding-sources/4d1cd214-8e70-4454-bf60-377c290125a3"
        }
      },
      "amount": {
        "currency": "USD",
        "value": "30.00"
      }

    }

    appToken.auth.client()
      .then(function (appToken: any) {

        appToken
          .post('transfers', tranfer, { "Idempotency-Key": 'e14fbcda-918e-4c2c-bd1b-e2228eb642f5' })
          .then(res => console.log(res.headers.get('location')));
      })
  }


  routes() {
    
      this.router.post('/customer/creater', this.createCustomer)
      this.router.get('/customers', this.listCustomers)
      this.router.get('/customer', this.getCustomer)
      this.router.post('/foundig', this.createFounding)
      this.router.post('/tranfer', this.makeTranfer)
  

  }
 

}


const indexRouter = new IndexRoutes();
indexRouter.routes();


export default indexRouter.router;