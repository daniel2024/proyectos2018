const  plaid  =  require ( ' plaid ' );

const PLAID_CLIENT_ID='5c6c4a7409ec71001165f348' ;
const  PLAID_SECRET='91fa94c7bd37601fd2e995caa49de4';
const PLAID_PUBLIC_KEY='57bd669a77ada74389c439baf23a9e' ;
//PLAID_PRODUCTS=transactions 
const PLAID_ENV='sandbox';
const  plaidClient  =  new  plaid.Client (
    PLAID_CLIENT_ID, 
    PLAID_SECRET, 
    PLAID_PUBLIC_KEY, 
    PLAID_ENV, {version :  ' 2018-05-22 ' });


    export default plaidClient;