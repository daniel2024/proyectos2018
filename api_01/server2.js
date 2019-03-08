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

app.get('/', function(request, response, next) {
  response.render('/plaid.html')
})

app.post('/plaid_exchange', (req, res) => {
var public_token = req.body.public_token;

plaidClient.exchangePublicToken(public_token).then(res => {
  const access_token = res.access_token;

  plaidClient.getAccounts(access_token).then(res => {
    console.log(res.accounts);
  });
}).catch(err => {
  // Indicates a network or runtime error.
  if (!plaid.isPlaidError(err)) {
    res.sendStatus(500);
    return;
  }

  // Indicates plaid API error
  console.log('/exchange token returned an error', {
    error_type: err.error_type,
    error_code: res.statusCode,
    error_message: err.error_message,
    display_message: err.display_message,
    request_id: err.request_id,
    status_code: err.status_code,
  });

  // Inspect error_type to handle the error in your application
  switch(err.error_type) {
      case 'INVALID_REQUEST':
        // ...
        break;
      case 'INVALID_INPUT':
        // ...
        break;
      case 'RATE_LIMIT_EXCEEDED':
        // ...
        break;
      case 'API_ERROR':
        // ...
        break;
      case 'ITEM_ERROR':
        // ...
        break;
      default:
        // fallthrough
  }

  res.sendStatus(500);
});
});

app.listen(port, () => {
  console.log(`Listening on port ${ port }`);
});