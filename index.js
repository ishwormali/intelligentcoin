var coinApi=require('./services/coinApi');
// var repo=require('./repository/repository');
var service=require('./services/coinServices');



setTimeout(processApi,1000);

function processApi(){
    coinApi.getPrices()
        .then(function(data){
            console.log(data);
            service.addCoinHistory(data);
            setTimeout(processApi,55000);
        },function(err){
            setTimeout(processApi,1000);
        });
}

