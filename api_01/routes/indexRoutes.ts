import { Response, Request, Router } from 'express';

import plaidClient from '../plaid/clientPlaid'
import appToken from '../ dwolla_resource/client';
import { json } from 'body-parser';


class IndexRoutes {

  router: Router;


  constructor() {

    this.router = Router();
    this.routes();


  }
  //lista los clientes
  listCustomers(req: Request, res: Response) {
    appToken.auth.client()
    .then(function(appToken) {
      console.log(appToken)
      
  
    });
   
    /*appToken.auth.client()
      .then(function (appToken: any) {
        appToken
          .get('customers', { limit: 10 })
          .then(res => console.log(res.body._embedded['customers']))

      })*/

  }
  //creo cliente
  createCustomer(req: Request, res: Response)
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
      .then(function (appToken: any) {

        appToken
          .post('customers', requestBody)
          .then(res => console.log(res.headers.get('location')))

      })

  }
  createFounding(req: Request, res: Response) {
    //----------------Plaid----------------------
    var ACCESS_TOKEN: string;
    var PUBLIC_TOKEN: string;
    var ITEM_ID: string;
    var PROCESSOR_TOKEN: string;

    var ACCOUNT_DATA:any;

    PUBLIC_TOKEN = req.body.public_token
    ITEM_ID = req.body.item_id

    plaidClient.exchangePublicToken(PUBLIC_TOKEN,
      async function (err: any, rese: any) {

        ACCESS_TOKEN = rese.access_token;

        ACCOUNT_DATA= await IndexRoutes.dataAccount(ACCESS_TOKEN,ITEM_ID);
        
        plaidClient.createProcessorToken(ACCESS_TOKEN, ITEM_ID,
          'dwolla', function (err: any, resep: any) {

            PROCESSOR_TOKEN = resep.processor_token;


            var customerUrl = "https://api-sandbox.dwolla.com/customers/9338b343-21ac-462a-8567-5c08cc7d46bf";
            var requestBody = {
            'routingNumber': ACCOUNT_DATA.routingNumber,
            'accountNumber': ACCOUNT_DATA.accountNumber,
            'bankAccountType': ACCOUNT_DATA.bankAccountType,
            'name': ACCOUNT_DATA.name,
            'plaidToken': PROCESSOR_TOKEN

          };

          appToken.auth.client()
          .then(function (appToken: any) {
    
    
            appToken
              .post(`${customerUrl}/funding-sources`, requestBody)
              .then(res => console.log(res.headers.get('location')));
    
          });


      })

    
    });
    

  }
  //-------------------------------------------   

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
    this.router.post('/foundig', this.createFounding)
    this.router.post('/tranfer', this.makeTranfer)

  }
  // funciones auxiliares
  static dataAccount(ACCESS_TOKEN: string, ITEM_ID: string) {
    var ACCOUNT_DATA:any ;

    plaidClient.getAuth(ACCESS_TOKEN, function (error, authResponse) {
      if (error != null) {
        console.log(error);
      }
      //filtro el vector por id de la cuenta  en ambos casos 
      //y obtengo de uno el roting y el numero de cuenta
      //del otro tipo de cuenta y nombre.Devuelve un object
      var account = authResponse.numbers.ach.find(function (element: any) {
        return element.account_id === ITEM_ID;
      });

       var account2 = authResponse.accounts.find(function (element: any) {
        return element.account_id === ITEM_ID;
      });
      
      ACCOUNT_DATA={ 
      
      'routingNumber':account.routing,
      'accountNumber':account.account,
       'name' :account2.name,
      'bankAccountType':account2.subtype,
      }
      console.log(ACCOUNT_DATA)

      return ACCOUNT_DATA;

    })

  }

}


const indexRouter = new IndexRoutes();
indexRouter.routes();


export default indexRouter.router;