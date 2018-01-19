var coinCollector=require('./services/coinCollector');
var coinAnalytics=require('./services/coinAnalytics');
var repo=require('./repository');
// var dataAlert=require('./repository/models/dataAlert');

// seed();
// coinCollector.start();

async function seed(){
    var count=await repo.models.DataAlert.count({});
    if(count==0){
        var schedules=[
            {coinId:'ETH',alertType:'falling', currencySymbol:'aud',dataCron:'1000 *',dateCreated:Date.now()},
            {coinId:'ETH',alertType:'rising', currencySymbol:'aud',dataCron:'* *',dateCreated:Date.now()}
                        ];
        repo.models.DataAlert.insertMany(schedules);
    }
    
}