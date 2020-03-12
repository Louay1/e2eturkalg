


const jsonPath = 'e2eturk.json';


// This function will display the IDs of the turkish LCs
function displayTurkishLCs(){
    $.ajax({
        url: jsonPath,
        dataType: 'json',
        type: 'GET',
        success: function(data){
            mainData = data.analytics.total_applications.buckets.buckets;

            for (let i=0; i<mainData.length; i++){
                $('#table thead tr').append("" +
                    "<th>"+ mainData[i].key + "</th>"
                );
            }

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
                    "<td>"+mainData[i].key +"</td>" +
                    "</tr>"+
                    "");
            }

        }
    })
}




function displayApplications(){
    $.ajax({
        url: jsonPath,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            turkLCs = data.analytics.total_applications.buckets.buckets;
            algeriaLcs = data.analytics.total_applications.children.buckets;
            for (let j=0; j<algeriaLcs.length; j++){
                for (let i=0; i<turkLCs.length; i++){
                    if(algeriaLcs[j].children.buckets[i].key === turkLCs[i].key){
                        console.log("Benak"+ algeriaLcs[j].children.buckets[i].key + "Turk : "+turkLCs[i].key);
                    }
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
            console.log(data.analytics);
            $('#table tbody').append("<tr><td>"+data.analytics.total_applications.doc_count+ "</td><tr>");
        }
    })
}
displayTurkishLCs();
displayAlgerianLCs();
test();
displayApplications();


