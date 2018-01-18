var mongoose=require('mongoose');
var Schema=mongoose.Schema,
    ObjectId=mongoose.ObjectId;


var coinHistorySchema=new Schema({
    coinId:String,
    btc:Number,
    usd:Number,
    aud:Number,
    date:Date
});


var CoinHistory=mongoose.model('CoinHistory',coinHistorySchema);

module.exports=CoinHistory;