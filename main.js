


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
            function compare(a,b){
               return a-b;
            }
            arrayTurkishLCs.sort(compare);
            //console.log(arrayTurkishLCs);
            /*
            arrayTurkishLCs.forEach(turkishLCKey => {
                $('#table thead tr').append("" +
                    "<th>"+ turkishLCKey + "</th>"
            );
            
            });
            */
            
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
                $('#table tbody').append("" +
                    "<tr>" +
                    "<th scope='row'>"+mainData[i].key +"</th>" +
                    "</tr>"+
                    "");
            }

        }
    })
}



var arrayDataE2E = [];

function displayApplications(){
    $.ajax({
        url: jsonPath,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            algeriaLcs = data.analytics.total_applications.children.buckets;
            arrayDataE2E = [];
            for (let j=0; j<algeriaLcs.length; j++){
                //console.log('Benak: '+algeriaLcs[j].key);
                
                for (let i=0; i<algeriaLcs[j].children.buckets.length; i++){
                    //console.log('Istanbul: '+algeriaLcs[j].children.buckets[i].key);
                    //console.log("Benak : "+ algeriaLcs[j].key + " Turk : "+algeriaLcs[j].children.buckets[i].key);
                    arrayDataE2E.push({
                        x:algeriaLcs[j].key,
                        y:algeriaLcs[j].children.buckets[i].key
                    });
                }
            }
        }
    })
}

function test(){
    $.ajax({
        url: jsonPath,
        dataType: 'json',
        type: 'GET',
        success: function(data){
            
            /*function compare(a,b){
                return ((a.y-b.y));
            }
            
            arrayDataE2E.sort(compare);
            */
            //console.log(arrayDataE2E);

        /**
         * Separate the data of each LC of Algeria with Turkey's LCs 
         * to properly manipulate it in the table and Display it.
         */
            var arrayOfEachLC = [];
            var arrayLCObject = [];
            var j = i = 0;
           while(i < arrayDataE2E.length){
                while(arrayDataE2E[i].x == arrayDataE2E[j].x){
                    arrayOfEachLC.push({
                        x:arrayDataE2E[i].x,
                        y:arrayDataE2E[j].y
                    });
                    j++;
                }
                //arrayLCObject.push(arrayOfEachLC);
                i = j;
                //Empty the array each time the ID of LC algeria is different
                arrayOfEachLC = [];
              
            }
            
            //console.log(arrayLCObject);
        }
    })
}

displayTurkishLCs();

displayAlgerianLCs();


displayApplications();

test();



/*
301 {
    813 => number applications 113
    528
    1893
    ...
    2849
}
302 {
    528
    1893
    ...
    813 number applications 100
    2849
}

301 , 302 {
    813 => 113+100
}
*/