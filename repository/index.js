var mongoose=require('mongoose');
mongoose.connect('mongodb://intelligentcoinuser:B7849RatinteLi33@cluster0-shard-00-00-syj7z.mongodb.net:27017,cluster0-shard-00-01-syj7z.mongodb.net:27017,cluster0-shard-00-02-syj7z.mongodb.net:27017/intellicoin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',{},function(err){
    if(err) {
        console.log('error connection');
        console.log(err);
    }
});

var models=require('./models');


module.exports={
    
    models:models
}

// mongodb://ratatouille:@cluster0-shard-00-00-syj7z.mongodb.net:27017,cluster0-shard-00-01-syj7z.mongodb.net:27017,cluster0-shard-00-02-syj7z.mongodb.net:27017/admin?replicaSet=Cluster0-shard-0&ssl=true
