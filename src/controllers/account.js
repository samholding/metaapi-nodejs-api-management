import { response } from 'express';
import { Helper } from '../helper';
import { accountService } from '../services';

const url         = require('url');
const querystring = require('querystring');

const MetaApi     = require('metaapi.cloud-sdk').default;
const MetaStats   = require('metaapi.cloud-sdk').MetaStats;

require("babel-core/register");
require("babel-polyfill");





class accountController {

    async get( request, response ) {
        
        const { query }   = url.parse(request.url);
        const queryParams = querystring.parse(query);

        if(queryParams.token == null || queryParams.accountId == null ){
            response.json("not account found 404 !");
        }
       
        console.log( "account ID : " +  queryParams.accountId)
        console.log(queryParams.token)

        const api = new MetaApi(queryParams.token);
        const metaStatsApi = new MetaStats(queryParams.token);


        try {
            let account = await api.metatraderAccountApi.getAccount(queryParams.accountId);


            let initialState   = account.state;
            let deployedStates = ['DEPLOYING', 'DEPLOYED'];


            if (account.state !== 'DEPLOYED') {
                await account.deploy();
            } else {
                console.log('Account already deployed');
            }

                
            console.log('Waiting for API server to connect to broker (may take couple of minutes)');
            if (account.connectionStatus !== 'CONNECTED') {
                await account.waitConnected();
            }

            // // connect to MetaApi API
            // let connection = account.getRPCConnection();
            // await connection.connect();
                    

            let metrics = await metaStatsApi.getMetrics(queryParams.accountId);
            console.log(metrics);//-> {trades: ..., balance: ..., ...}
            
            let trades = await metaStatsApi.getAccountTrades(queryParams.accountId , '0000-01-01 00:00:00.000', '9999-01-01 00:00:00.000');
            console.log(trades.slice(-5));//-> {_id: ..., gain: ..., ...}
            
            // let openTrades = await metaStats.getAccountOpenTrades(accountId);
            // console.log(openTrades);//-> {_id: ..., gain: ..., ...}


            const data = {
                "account_information"       : await connection.getAccountInformation(),
                "metrics"                   : metrics,
                "trades"                    : trades,
            };

            // "server_time"               : await connection.getServerTime() ,
            // "positions"                 : await connection.getPositions(),
            // "open_trades"               : openTrades,
            // "open_orders"               : await connection.getOrders(),
            // "history_orders_by_ticket"  : await connection.getOrders(),
            // "history_orders_by_position": await connection.getOrders(),


            // if(!deployedStates.includes(initialState)) {
            //     // undeploy account if it was undeployed
            //     console.log('Undeploying account');
            //     await connection.close();
            //     await account.undeploy();
            // }

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
  

    