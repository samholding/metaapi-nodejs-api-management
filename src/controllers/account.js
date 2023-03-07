import { response } from 'express';
import { Helper } from '../helper';
import { accountService } from '../services';

const url         = require('url');
const querystring = require('querystring');
const MetaApi     = require('metaapi.cloud-sdk').default;


class accountController {

    get(request, response) {
        
        const { query }   = url.parse(request.url);
        const queryParams = querystring.parse(query);
      


        if(queryParams.token == null || queryParams.accountId == null ){
            response.json("not account found 404 !");
        }


        
        // get account information 
        getAccountInformation( queryParams.token , queryParams.accountId , response ); 
        


    }





    async  getAccountInformation( token , accountId , response ) {

        const api = new MetaApi(token);

        try {
            const account = await api.metatraderAccountApi.getAccount(accountId);
            const initialState = account.state;
            const deployedStates = ['DEPLOYING', 'DEPLOYED'];
        
            response.json(token);

            // if(!deployedStates.includes(initialState)) {
            //     await account.deploy();
            // }
            
            // console.log('Waiting for API server to connect to broker (may take couple of minutes)');
            // await account.waitConnected();
        
            // // connect to MetaApi API
            // let connection = account.getRPCConnection();
            // await connection.connect();
        
            // // wait until terminal state synchronized to the local state
            // console.log('Waiting for SDK to synchronize to terminal state (may take some time depending on your history size)');
            // await connection.waitSynchronized();



            // const data = {
            //     "server time"               : await connection.getServerTime() ,
            //     "account information"       : await connection.getAccountInformation(),
            //     "positions"                 : await connection.getPositions(),
            //     "open_orders"               : await connection.getOrders(),
            //     "history_orders_by_ticket"  : await connection.getOrders(),
            //     "history_orders_by_position": await connection.getOrders(),
            // };
            

            response.json(data);

        } catch (err) {
            console.error(err);
        }
    }



    
    

}

export default new accountController();







  
    //   console.log('account information:', await connection.getAccountInformation());
    //   console.log('positions:', await connection.getPositions());
    //   //console.log(await connection.getPosition('1234567'));
    //   console.log('open orders:', await connection.getOrders());
    //   //console.log(await connection.getOrder('1234567'));
    //   console.log('history orders by ticket:', await connection.getHistoryOrdersByTicket('1234567'));
    //   console.log('history orders by position:', await connection.getHistoryOrdersByPosition('1234567'));
    //   console.log('history orders (~last 3 months):', 
    //     await connection.getHistoryOrdersByTimeRange(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()));
    //   console.log('history deals by ticket:', await connection.getDealsByTicket('1234567'));
    //   console.log('history deals by position:', await connection.getDealsByPosition('1234567'));
    //   console.log('history deals (~last 3 months):', 
    //     await connection.getDealsByTimeRange(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()));
    //   console.log('server time', await connection.getServerTime());
  



    //   // calculate margin required for trade
    //   console.log('margin required for trade', await connection.calculateMargin({
    //     symbol: 'GBPUSD',
    //     type: 'ORDER_TYPE_BUY',
    //     volume: 0.1,
    //     openPrice: 1.1
    //   }));
  
    //   // trade
    //   console.log('Submitting pending order');
    //   try {
    //     let result = await
    //     connection.createLimitBuyOrder('GBPUSD', 0.07, 1.0, 0.9, 2.0, {
    //       comment: 'comm',
    //       clientId: 'TE_GBPUSD_7hyINWqAlE'
    //     });
    //     console.log('Trade successful, result code is ' + result.stringCode);
    //   } catch (err) {
    //     console.log('Trade failed with result code ' + err.stringCode);
    //   }
  
    //   if(!deployedStates.includes(initialState)) {
    //     // undeploy account if it was undeployed
    //     console.log('Undeploying account');
    //     await connection.close();
    //     await account.undeploy();
    //   }
    