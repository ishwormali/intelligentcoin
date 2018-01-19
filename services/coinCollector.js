var coinApi=require('./coinApi');
// var repo=require('./repository/repository');
var service=require('./coinServices');
var events=require('../constants/events');
var PubSub=require('pubsub-js');

var coinCollector={
    
}
var timerId;
async function processApi(){
    try {
        var data=await coinApi.getPrices();
        
        // console.log('new coin');
        // console.log(data);
        await service.addCoinHistory(data);
        // console.log('All coins saved');
        setTimeout(processApi,12000);
        PubSub.publish(events.NEW_DATA,data);
        
    } catch (error) {
        setTimeout(processApi,10000);
    }
    finally{

    }
    
        // },function(err){
            // setTimeout(processApi,10000);
        // });
}

coinCollector.start=function(){

    timerId= setTimeout(processApi,1000);
    
}


module.exports=coinCollector;