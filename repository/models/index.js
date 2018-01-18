var fs=require('fs'),
    path=require('path');


var files=fs.readdirSync(__dirname);

var models={};

files.forEach(file => {
    if(file!='index.js') {
        var model=require(path.join(__dirname,file.replace('.js','')));
        models[model.modelName]=model;
        // console.log(model.modelName);
    }
    
});


module.exports=models;