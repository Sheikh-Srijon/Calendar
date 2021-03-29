//constructor 
function TableTemplate(){
    
   
}

//static method params: id attribute for a <table>, a dictionary object, and a string columnName. 
TableTemplate.fillIn = function(id,dict,columnName){
    var table = document.getElementById(id);
    // //examine the header row 
    var tbody  = table.tBodies[0];
    var first_tr = tbody.rows[0]; //header row 
    

    myCol = [];

    for(let i = 0 ; col = first_tr.cells[i]; i++){
            
            var template = new Cs142TemplateProcessor(col.textContent);
            var newTemplate = template.fillIn(dict);
            col.textContent = newTemplate;
            if(col.textContent === columnName){
                myCol.push(i);
            }
    }

   
    for (let i = 0, row; row = table.rows[i]; i++) {
        for (letj = 0, col; col = row.cells[j]; j++) {
          
          if(myCol.includes(j)){
            var template = new Cs142TemplateProcessor(col.textContent);
            var newTemplate = template.fillIn(dict);
            col.textContent = newTemplate;
            }
        }  
     }
//if columnName not provided 
     if(myCol.length === 0){
            for (var i = 0, row; row = table.rows[i]; i++) {
        
            for (var j = 0, col; col = row.cells[j]; j++) {  
                var template = new Cs142TemplateProcessor(col.textContent);
                var newTemplate = template.fillIn(dict);
                col.textContent = newTemplate;
            }  
         }

     }

     table.style.visibility = "";
};

 