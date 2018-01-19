var repo=require('../repository');

var service={

}

service.addCoinHistory=async function(coinHistories) {
    try {
        for(coinId in coinHistories){
            var historyItem=coinHistories[coinId];
            // console.log(coinId);
            var model=new repo.models.CoinHistory({
                coinId:coinId,
                btc:historyItem.BTC,
                usd:historyItem.USD,
                aud:historyItem.AUD,
                date:Date.now()
            });
            await model.save();
            
            // console.log('document saved');
            
        }
    } catch (error) {
        
    }
    
    
}

module.exports=service;