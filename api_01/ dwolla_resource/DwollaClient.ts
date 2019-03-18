import token from './client';
import client from './client';
import _ from 'lodash';



class DwollaClient {



    async getClients() {

        return await token.auth.client()
            .then(appToken => appToken.get('customers'))
            .then(res => res.body._embedded);

    }

    async  getClientByEmail(email: string) {
        return await client.auth.client()
            .then(appToken => appToken.get('customers', { search: email })
                .then(res => res.body._embedded.customers[0]))
    }

    async  clientCreate(date: Object) {


        return await token.auth.client()
            .then(appToken => appToken.post('customers', date)
                .then(res => res.headers.get('location')))


    }

    async getFundingSources(email: string) {
        //alguna forma de tener todas las rutas guardadas

        var urlClient = await this.getClientByEmail(email)
            .then(client => 'https://api-sandbox.dwolla.com/customers/' + client.id)
        return await token.auth.client()
            .then(appToken => appToken.get(`${urlClient}/funding-sources`, { removed: false })
                .then(res => res.body._embedded['funding-sources']))


    }
    async getFundingSourcesByNameAndType(email: string, name: string, type: string) {

        var foundingSources = await this.getFundingSources(email);

        return await foundingSources.find(function (element: any) {
            return (element.name == name && element.bankAccountType == type);
        })



    }



    async fundingSourceCreate(requestBody: any, email: string) {

      

        var customerUrl = await this.founRoutes(await this.getClientByEmail(email), 'funding-sources')
        
        return await token.auth.client()
            .then(appToken => appToken.post(customerUrl, requestBody)
                .then(res => res.headers.get('location')))


    }




    //obtiene las rutas de los objetos de dwolla
    //(objeto , string (elmeto q se quiere)) si no se manda elemento te da los item q no son rutas  
    async  founRoutes(elemento: any, ruta?: string) {

        if (ruta) {
            var path
            return await _.get(elemento, path = `_links.${ruta}.href`)

        }
        else {
            await delete elemento._links
            return elemento;
        }

    }

}
const dwollaClient = new DwollaClient()


export default dwollaClient;
