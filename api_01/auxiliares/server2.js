'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const plaid = require('plaid');

const PLAID_CLIENT_ID='5c6c4a7409ec71001165f348' ;
const  PLAID_SECRET='91fa94c7bd37601fd2e995caa49de4';
const PLAID_PUBLIC_KEY='57bd669a77ada74389c439baf23a9e' ;
//PLAID_PRODUCTS=transactions 
const PLAID_ENV=plaid.environments.sandbox;
const  plaidClient  =  new plaid.Client (
    PLAID_CLIENT_ID, 
    PLAID_SECRET, 
    PLAID_PUBLIC_KEY, 
    PLAID_ENV, {version :  ' 2018-05-22 ' });
    
const app = express();
const port = process.env.PORT || 9000;

app.use(express.static('/public'))


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));
 



    /*

app.get('/', function(request, response, next) {
  
  plaidClient.getInstitutions (4, 2225, function callback(err, response) {
    if (err != null) {
      if (plaid.isPlaidError(err)) {
        // This is a Plaid error
        console.log(err.error_code + ': ' + err.error_message);
      } else {
        // This is a connection error, an Error object
        console.log(err.toString());
      }
    }
    console.log(response.institutions)
  }).then(data => res.send(data));
})
*/
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;
var PROCESSOR_TOKEN= null;
//------------------------------conseguir datos de plaid *-----------
 

app.post('/get_access_token', (req, res) => {

  PUBLIC_TOKEN = req.body.public_token
  ITEM_ID=req.body.item_id
 
  plaidClient.exchangePublicToken(PUBLIC_TOKEN, 
    function(err, rese) {
  
      ACCESS_TOKEN= rese.access_token;
      //ITEM_ID=rese.item_id
     // console.log(rese)
       // dataAccount(ACCESS_TOKEN,ITEM_ID);
    

      plaidClient.createProcessorToken(ACCESS_TOKEN, ITEM_ID, 
        'dwolla', function(err, resep) {
   
       PROCESSOR_TOKEN=resep.processor_token;
         console.log(PROCESSOR_TOKEN);
         });

        });


      
        function dataAccount(ACCESS_TOKEN ,ITEM_ID){
          var  ACCOUNT_DATA=new Object();
          
          plaidClient.getAuth(ACCESS_TOKEN, function(error, authResponse) {
            if (error != null) {
              console.log(error);
              }
              account = authResponse.accounts.find(function(element) {
              return element.account_id===ITEM_ID;
              });
              ACCOUNT_DATA.name=account.name
              
             
                
              return ACCOUNT_DATA;
            
            })
        
        }

})







app.listen(port, () => {
  console.log(`Listening on port ${ port }`);
});