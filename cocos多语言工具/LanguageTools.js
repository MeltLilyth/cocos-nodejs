var LanguageTools = (function(){
    function LanguageTools(){
        if(this.languageMap == undefined || this.LanguageMap == null){
            this.languageMap = new Map();
        }
    }

    //在进程开始前调用，加载对应的数据
    LanguageTools.prototype.initLanguageMap = function(){
        var _instance = this;
        if(_instance.languageMap == undefined || _instance.languageMap == null){
            _instance.languageMap = new Map();
        }
        var xhr = new XMLHttpRequest();
        xhr.open("GET","./res/confusedResources/language.json");
        xhr.onload = function(){
            if(this.readyState == 4){
                var datas = JSON.parse(this.responseText);
                for(var item in datas){
                    _instance.languageMap.set(item.jsonKey,item.dataContent);
                }
            }
        }
        xhr.timeout = 3000;
        xhr.send();
    }

    LanguageTools.prototype.getLanguageContent = function(chineseLanguage){
        if(this.languageMap.has(chineseLanguage)){
            return this.languageMap.get(chineseLanguage);
        }
        else{
            for(var dataItem in this.languageMap.values){
                if(dataItem.params != undefined){
                    if(this.checkString(chineseLanguage,dataItem.params) && this.splitString(chineseLanguage,dataItem.params) == dataItem.params.length + 1 ){
                        return dataItem; 
                    }
                }
            }
        }
    }

    LanguageTools.prototype.checkString = function(str,params){
        if(str != undefined && str != null && params && params != null && typeof params == 'object'){
            for(var param in params){
                if(str.indexOf(params) == -1){
                    return false
                }
            }
            return true;
        }
        return false;
    }

    LanguageTools.prototype.splitString = function(str,parts){
        var results = new Array();
        if(typeof parts != 'object' && str.indexOf(parts) != -1){
            return str.split(parts);
        }
        else{
            for(var part in parts){
                result.concat(this.splitString(str,part));
            }
        }
        return results;
    }

    LanguageTools.prototype.formateString = function(str,contents){

        for(let i = 0; i< contents.length; i++){
            str = str.replace(new RegExp("\\{" + i + "\\}", "g"), contents[i]);
        }
        return str;
    }

    return LanguageTools;
});

window.LanguageTools = new LanguageTools();

var ImageTools = (function(){
    function ImageTools(){
        if(this.ImageMap == undefined || this.ImageMap === null){
            this.ImageMap = new Map();
        }
        this.initImageMap();
    }

    ImageTools.prototype.initImageMap = function(){
        let _instance = this;
        if(_instance.ImageMap == undefined || _instance.ImageMap == null){
            _instance.ImageMap = new Map();
        }
        var xhr = new XMLHttpRequest();
        xhr.open("GET","./res/confusedResources/image.json");
        xhr.onload = function(){
            if(this.readyState == 4){
                var datas = JSON.parse(this.responseText);
                for(var item in datas){
                    _instance.ImageMap.set(item.jsonKey,item.dataContent);
                }
            }
        }
        xhr.timeout = 3000;
        xhr.send();
    }

    ImageTools.prototype.getImageContent = function(jsonKey,languageType){
        if(this.ImageMap.has(jsonKey)){
            return this.ImageMap.get(jsonKey).languageType;
        }
    }
    
    return ImageTools;
}());

window.ImageTools = new ImageTools();