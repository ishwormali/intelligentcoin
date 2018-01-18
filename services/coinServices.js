var repo=require('../repository/repository');

var service={

}

service.addCoinHistory=function(coinHistories) {
    for(coinId in coinHistories){
        var historyItem=coinHistories[coinId];
        console.log(coinId);
        var model=new repo.models.CoinHistory({
            coinId:coinId,
            btc:historyItem.btc,
            usd:historyItem.usd,
            aud:historyItem.aud,
            date:Date.now()
        });
        model.save(function(err,saved){
            if(err){
                console.log('error saving model');
                console.log(err);    
            }
            
        });
    }
    
}

module.exports=service;