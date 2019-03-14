import clientPlaid from './clientPlaid'



class  PlaidToken
{
  async  getToken(PUBLIC_TOKEN:string , ITEM_ID:string):Promise<any>{

        
/*
lo que mando cuando tengo usar  
      req.body.public_token
      req.body.item_id
*/
       await clientPlaid.exchangePublicToken(PUBLIC_TOKEN, 
          async   (err:any, res:any)=> {
             var  ACCESS_TOKEN= await res.access_token;        
              //  dataAccount(ACCESS_TOKEN,ITEM_ID)
           await  clientPlaid.createProcessorToken(ACCESS_TOKEN, ITEM_ID, 
                'dwolla', async function(err:any, resep:any) {
                    
               return await resep.processor_token;
                 
                 });
        
                });
        
            
}
}

var plaidToken=new PlaidToken()

export default plaidToken;