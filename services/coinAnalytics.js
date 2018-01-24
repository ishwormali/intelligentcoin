var events=require('../constants/events');
var PubSub=require('pubsub-js');
var inProgress=false;
var repo=require('../repository');

async function onNewData(msg,data){
    // console.log('new data arrived');
    if(inProgress==true){
        return;
    }

    try {

        inProgress=true;
        // console.log('finding alerts: ');
        var dataAlerts=await repo.models.DataAlert
                            .where('dataCron').ne(null)
                            .where('frequencyCron').eq(null).exec();
        // console.log('found dataAlerts: '+dataAlerts.length);
        // console.log(dataAlerts);
        for(var i=0;i<dataAlerts.length;i++) {
            var dataAlert=dataAlerts[i];
            // console.log(dataAlert);
            console.log(`processing Alert type: ${dataAlert.alertType} ,  ${dataAlert.coinId} ${dataAlert.currencySymbol} ${dataAlert.dataCron}`);
            var lastTwoData=await repo.models.CoinHistory.find()
                            .where('coinId').eq(dataAlert.coinId)
                            .sort({_id:-1}).limit(2).exec();

            var cronExps=dataAlert.dataCron.split(' ');
            var absExp=cronExps.length>0?cronExps[0]:null;
            var relExp=cronExps.length>1?cronExps[1]:null;

            if(relExp!=null && relExp!="*" && lastTwoData.length<2){
                console.log('not enough data for expression '+dataAlert.dataCron);
                return;
            }
            
            var latestData=lastTwoData[0];
            var firstData=lastTwoData.length>1?lastTwoData[1]:null;
            
            
            // var changeBy
            if(absExp ==null && relExp==null){
                console.log('both expression is null');
                return;
            }
            
            if(absExp!=null && absExp!="*") {
                if(dataAlert.alertType=='falling'){
                    if(latestData[dataAlert.currencySymbol]<=parseFloat(absExp)){
                        console.log('alerting for the expression '+dataAlert.dataCron);
                    }
                }
                else if(dataAlert.alertType=='rising'){
                    if(latestData[dataAlert.currencySymbol]>=parseFloat(absExp)){
                        console.log('alerting for the expression '+dataAlert.dataCron);
                    }
                }
                
            }
            else if (relExp!=null && relExp!="*"){
                var relPcExp=relExp.substr(0,1)=="%"?parseFloat(relExp.replace('%','')):null;
                var relAbsExp=relPcExp==null?relExp:null;
                // if(relPcExp!=null){
                //     var variance=latestData[dataAlert.currencySymbol]-;
                //     var pcChange=
                // }
                
                if(dataAlert.alertType=="negativechange"){
                    var lastTopCoinHistories=await repo.models.CoinHistory.find()
                                    .where('coinId').eq(dataAlert.coinId)
                                    .where(dataAlert.currencySymbol).gt(latestData[dataAlert.currencySymbol])
                                    .sort({_id:-1}).limit(1).exec();
                    if(lastTopCoinHistories!=null && lastTopCoinHistories.length>0){
                        var lastTopCoinHistory=lastTopCoinHistories[0];
                        if(relPcExp!=null){
                            var change=lastTopCoinHistory[dataAlert.currencySymbol]-latestData[dataAlert.currencySymbol];
                            if((change * 100)/lastTopCoinHistory[dataAlert.currencySymbol]>=relPcExp){
                                console.log(`alert negativeChange by ${relPcExp}`);
                            }
                        }
                    }
                }
            }

            
        }

    } catch (error) {
        console.log(error);
    }
    finally{
        inProgress=false;
    }
    

}

setInterval(onNewData,10000);

// PubSub.subscribe(events.NEW_DATA,onNewData);
