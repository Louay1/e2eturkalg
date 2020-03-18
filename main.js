

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
            /*function compare(a,b){
               return a-b;
            }
            arrayTurkishLCs.sort(compare);
            //console.log(arrayTurkishLCs);
            */
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

            for (let i=0; i<mainData.length; i++){

               /* $('#table tbody').append("" +
                    "<tr>" +
                    "<th scope='row'>"+mainData[i].key +"</th>" +
                    "</tr>"+
                    "");
                    */
            }

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
                obj[i] = { "id" : lcAlgeria.key }
                i++;
            }

             /**
             * Add Turkey's LCs data to each LC of algeria 
             */

            var j = k = 0;
            for(lcAlgeria of algeriaLcs){

                for(lcTurkey of lcAlgeria.children.buckets){

                    obj[j][k] = { 
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


            for (let j = 0; j < obj.length; j++) {
                
                let lc = obj[j];
                //console.log('lc turkey');

                $('#table tbody').append("" +
                    "<tr>"+
                        "<th scope='row'>"+
                            lc.id
                        +"</th>"
                    +"<tr>");

                /*for (let i = 0; i < lc.length; i++) {
    
                    console.log(lc[i].id_turkey);
                    
                    $('#table tbody tr').append("" +
                        +"</td>"+
                            lc[i].id_turkey
                        +"</td>");
                }*/
            }
           
        }
    })
}

displayTurkishLCs();

displayAlgerianLCs();


displayApplications();

test();
