var axios=require('axios');

var coinApi=function(){

};

coinApi.prototype.getList=async function(){
    return await axios.get('https://www.cryptocompare.com/api/data/coinlist/')
        .then(function(data){
            console.log(data);
            return data;
        });

}

coinApi.prototype.getPrices=async function(){
    return await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BTC&tsyms=BTC,USD,AUD')
        .then(function(data){
            return data.data;
        });
}

module.exports=new coinApi();