var dwolla = require('dwolla-v2');

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

    clientes = await getClients();
    cliente = await clientes.customers.find(function (element) {
        return element.email === email;
    });


    return cliente;
}


try {

    getClients()
    .then(data => console.log(data));
} catch (error) {

}

