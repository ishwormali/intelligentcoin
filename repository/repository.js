var mongoose=require('mongoose');
mongoose.connect('mongodb+srv://intelligentcoinuser:Bp1824@PwdRAT@cluster0-syj7z.mongodb.net/test',{},function(err){
    console.log('error connection');
    console.log(err);
});

var models=require('./models');


module.exports={
    
    models:models
}