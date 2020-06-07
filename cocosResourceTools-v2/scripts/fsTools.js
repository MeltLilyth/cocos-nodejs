const path = require('path');
const url = require('url');
const fs = require('fs');
const xlsx = require('xlsx');

//fsTools -- class
var fsTools = new function(){
    return this;
}

fsTools.fileList = new Array();
fsTools.exportExcelData = new Array();

fsTools.loadAllFile = function(targetPath){
    let files = fs.readdirSync(targetPath);
    files.forEach((value,index)=>{
        let absolotePath = path.join(targetPath,value);
        let fsport = fs.lstatSync(absolotePath);
        fsport.isDirectory()? fsTools.fileList = fsTools.loadAllFile(absolotePath) : fsTools.fileList.push(absolotePath);
    });

    return fsTools.fileList;
}

fsTools.exportExcelData = function(datas){
    let excelData = {name : "Sheet1",data : null};
    let dataArray = new Array();
    datas.forEach(value=>{
        let writeStream = fs.readFileSync(value);
        let fileContent = JSON.parse(writeStream.toString());
        if(fileContent.length > 0){
            fileContent.forEach(value=>{
                if(fileContent.__type__ != undefined && fileContent.__type__ == "cc.Label"){
                    console.log(value);
                    console.log(fileContent._string);
                } 
            })
        }
        else{
            if(fileContent.__type__ != undefined && fileContent.__type__ == "cc.Label"){
                console.log(value);
                console.log(fileContent._string);
            }
        }
    });
}




// window.fsTools = new fsTools();
var fileArray = fsTools.loadAllFile("C:/Users/冷笑の游里/Desktop/web-mobile/res/import");
fileArray.forEach((value)=>{
    console.log(value);
});
console.log(fileArray.length);