function Cs142TemplateProcessor(template){
    Cs142TemplateProcessor.prototype.fillIn = function (dictionary) {


        Object.keys(dictionary).forEach(function (key) {
            var word = new RegExp("{{" + key + "}}", 'g');
            template = template.replace(word ,dictionary[key]);
            
        });

        //there might be placeholder not in dictionary
        var nonDict = new RegExp("\{\{[^\s]*\}\}", 'g'); 
        template = template.replace(nonDict, "");        
        return template;
    };

}


    