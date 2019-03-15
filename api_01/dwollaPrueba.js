var dwolla = require('dwolla-v2');
var _ =require ('lodash');
var client = new dwolla.Client({
    key: '8gPHaxKdVSK6gOm5PtYCWbEL3klJMLROq1XpmhbHCJi90AX9Ut',
    secret: 't0YmIguGRuqIFhRBQAtqLDHPrtGNKDN157XmRNvxGyuN1lUmgY',
    environment: 'sandbox'

});
async function getClients() {

    return await client.auth.client()
        .then(appToken => appToken.get('customers'))
        .then(res => res.body._embedded);
}

async function getClient(email) {

    return await client.auth.client()
    .then(appToken => appToken.get('customers',{search:email})
    .then(res => res.body._embedded['customers'][0]));
}
async function founRoutes(elemento , ruta ){

    if(ruta){

        return await _.get(elemento,path=`_links.${ruta}.href`)
     
    }
   else{ await delete elemento._links
         return elemento;
   }
        
}


try {
var banco={
    "_links": {
        "self": {
            "href": "https://api-sandbox.dwolla.com/funding-sources/642af5d7-0fd7-44ca-ab48-4e15547a7b4e",
            "type": "application/vnd.dwolla.v1.hal+json",
            "resource-type": "funding-source"
        },
        "balance": {
            "href": "https://api-sandbox.dwolla.com/funding-sources/642af5d7-0fd7-44ca-ab48-4e15547a7b4e/balance",
            "type": "application/vnd.dwolla.v1.hal+json",
            "resource-type": "balance"
        },
        "transfer-send": {
            "href": "https://api-sandbox.dwolla.com/transfers",
            "type": "application/vnd.dwolla.v1.hal+json",
            "resource-type": "transfer"
        },
        "with-available-balance": {
            "href": "https://api-sandbox.dwolla.com/funding-sources/642af5d7-0fd7-44ca-ab48-4e15547a7b4e",
            "type": "application/vnd.dwolla.v1.hal+json",
            "resource-type": "funding-source"
        },
        "customer": {
            "href": "https://api-sandbox.dwolla.com/customers/9338b343-21ac-462a-8567-5c08cc7d46bf",
            "type": "application/vnd.dwolla.v1.hal+json",
            "resource-type": "customer"
        },
        "transfer-receive": {
            "href": "https://api-sandbox.dwolla.com/transfers",
            "type": "application/vnd.dwolla.v1.hal+json",
            "resource-type": "transfer"
        }
    },
    "id": "642af5d7-0fd7-44ca-ab48-4e15547a7b4e",
    "status": "verified",
    "type": "balance",
    "name": "Balance",
    "created": "2019-03-05T21:24:53.214Z",
    "removed": false,
    "channels": []
}
founRoutes(banco,'customer')
.then(data => console.log(data))
    
} catch (error) {

}

