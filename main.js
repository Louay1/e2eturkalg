

const jsonPath = 'e2eturk.json';

// This function will display the IDs of the turkish LCs
function displayTurkishLCs(){
    $.ajax({
        url: jsonPath,
        dataType: 'json',
        type: 'GET',
        success: function(data){
            mainData = data.analytics.total_applications.buckets.buckets;
            var  arrayTurkishLCs = [];

            for (let i=0; i<mainData.length; i++){
                
                arrayTurkishLCs.push(mainData[i].key);
            }
            /**
             * Changing the sort method so it can arrange the values from small ID to Bigger ID
             */
            /*
            function compare(a,b){
               return a-b;
            }
            arrayTurkishLCs.sort(compare);
            */
            //console.log(arrayTurkishLCs);
            
                arrayTurkishLCs.forEach(turkishLCKey => {
                    $('#table thead tr').append("" +
                        "<th>"+ turkishLCKey + "</th>"
                    );
                });
            
        }
    })
}

// This function will display the IDs of the algerian LCs
function displayAlgerianLCs(){
    $.ajax({
        url: jsonPath,
        dataType: 'json',
        type: 'GET',
        success: function(data){

            mainData = data.analytics.total_applications.children.buckets;

            /*
            for (let i=0; i<mainData.length; i++){

                $('#table tbody').append("" +
                    "<tr>" +
                    "<th scope='row'>"+mainData[i].key +"</th>" +
                    "</tr>"+
                    "");
                    
            }
            */
        }
    })
}


var arrayDataE2E = [];
var lcsAlgeriaTurkey = {};
var obj = [];

function displayApplications(){
    $.ajax({
        url: jsonPath,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
           
            algeriaLcs = data.analytics.total_applications.children.buckets;
            
            /**
             * Add Algeria's LCs first to the array
             */
            let i = 0;
            
            for(lcAlgeria of algeriaLcs){
                obj[i] = [ lcAlgeria.key ]
                i++;
            }

             /**
             * Add Turkey's LCs data to each LC of algeria 
             */
            
            var j = k = 0;
            for(lcAlgeria of algeriaLcs){

                for(lcTurkey of lcAlgeria.children.buckets){

                    obj[j][k] = { 
                                    "id" : lcAlgeria.key,
                                    "id_turkey" : lcTurkey.key, 
                                    "applications" : lcTurkey.doc_count,
                                    "applicants" : lcTurkey.applicants.value
                                }
                    k++;
                }
                    k = 0;

                    j++;
            }
            
            console.log(obj);
        }
    })
}

function test(){
    $.ajax({
        url: jsonPath,
        dataType: 'json',
        type: 'GET',
        success: function(data){

            //when you iterate the first time everything is good tho the second time the second 
            //row of data also gets pushed to the same ol so that's the problem.
            
            let el;
            for(data of obj){
               
                el = $("<ol data-key="+data[0].id+"></ol>");
                $(".list").append(el);

                for(lc of data){
                    
                    if($(".list ol").data('key') == data[0].id){

                        $(".list ol").append("<li>"+lc.id_turkey+"</li>");

                    }
                    
                }

                key++; 

            }
        }
    })
}

displayTurkishLCs();

displayAlgerianLCs();


displayApplications();

test();
