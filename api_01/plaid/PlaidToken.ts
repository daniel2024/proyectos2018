import clientPlaid from './clientPlaid'
import DwollaClient from '../ dwolla_resource/DwollaClient'
import appToken from '../ dwolla_resource/client'

class PlaidToken {

 
  async  getToken(PUBLIC_TOKEN: string, ITEM_ID: string, email: string): Promise<any> {


   
    clientPlaid.exchangePublicToken(PUBLIC_TOKEN,
      async (err: any, res: any) => {
       var  ACCESS_TOKEN = await res.access_token;
        clientPlaid.createProcessorToken(ACCESS_TOKEN, ITEM_ID,
          'dwolla', async function (err: any, resep: any) {

            var ProcessorToken = await resep.processor_token;
            
            var requestBody = await {
              'plaidToken': ProcessorToken,
              'name': 'Plaid cheking'
          };
             
            DwollaClient.fundingSourceCreate(ProcessorToken,email)
          

      })
    })
  }


  async dataAccount(ACCESS_TOKEN:string  ,ITEM_ID:string){
    var  ACCOUNT_DATA:string;
    
      await clientPlaid.getAuth(ACCESS_TOKEN, function(error, authResponse) {
      if (error != null) {
        console.log(error);
        }
        var account = authResponse.accounts.find(function(element) {
        return element.account_id===ITEM_ID;
        });
        ACCOUNT_DATA=account.name
        
       
          
        return ACCOUNT_DATA;
      
      })
  
  }
}
var plaidToken = new PlaidToken()

export default plaidToken;