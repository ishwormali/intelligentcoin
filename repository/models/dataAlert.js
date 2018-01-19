var mongoose=require('mongoose');

var dataAlertSchema=new mongoose.Schema({
    coinId:String,
    alertType:String,
    currencySymbol:String,
    dataCron:String,
    frequencyCron:String,
    dateCreated:Date,
    alerts:[{
        coinId:String,
        alertType:String,
        currencySymbol:String,
        dataCron:String,
        frequencyCron:String,
        dateCreated:Date

    }
    ]
    
});


var dataAlertModel=mongoose.model('DataAlert',dataAlertSchema);

module.exports=dataAlertModel;

