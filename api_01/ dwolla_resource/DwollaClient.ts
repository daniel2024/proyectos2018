import token from './client';




class DwollaClient {



    async getClients() {

        return await token.auth.client()
            .then(appToken => appToken.get('customers'))
            .then(res => res.body._embedded);

    }

    async  getClientByEmail(email: string) {
/*
        var clientes = await this.getClients();

        var cliente = await clientes.customers.find(function (element: any) {
            return element.email === email;
        });

    
        return cliente;*/
        return await token.auth.client()
        .then(appToken => appToken.get('customers'),{search:email})
        .then(res => res.body._embedded);

    }

    async  clientCreate(date:Object) {
        

        return await token.auth.client()
         .then(appToken=>  appToken.post('customers', date)
         .then(res => res.headers.get('location')))
        
       
    }

    async getFundingSource(){


    }

    async fundingSourceCreate(){}

}
const dwollaClient = new DwollaClient()


export default dwollaClient;
