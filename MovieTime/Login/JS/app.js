//The URIs of the REST endpoint
RAAURI = "";
CIAURI = "https://prod-08.northeurope.logic.azure.com:443/workflows/7c7b19ca641c4241b39d2bdf6324dab1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3Je8tdEnrBzCH10KlLlWND-LD6pp7_yOm-2ba_EA-_U";

DIAURI0 = "";
DIAURI1 = "";

RIAURI0 = "https://prod-26.northeurope.logic.azure.com/workflows/7a4c57888a6a48dfa372bcc1f18faa21/triggers/manual/paths/invoke/rest/v1/assets/";
RIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pukpavzmikd9UJxYobz417m7r6NUqGpxtHR7vK78i4U";


//Handlers for button clicks
$(document).ready(function() {

 
    $("#CreatorSignIn").click(function () {
      
      //Run the get asset list function
        getAssetList();
       // window.location.href("Registration/index.html")
    });

    $("#ConsumerSignIn").click(function () {

        //Run the get asset list function
        getAssetList();
        // window.location.href("Registration/index.html")
    });
});

////A function to submit a new asset to the REST endpoint 
//function submitNewAsset(){
  
//  //Construct JSON Object for new item
//    var subObj = {
        
//        EmailAddress: $('#EmailAddress').val(),
//        UserType: $('#UserType').val(),
//        Password: $('#Password').val()
//    }

//  //Convert to a JSON String
//    subObj = JSON.stringify(subObj);

//  //Post the JSON string to the endpoint, note the need to set the content type header
//    $.post({ url: CIAURI, data: subObj, contentType: 'application/json; charset=utf-8' }).done(function (response) { getAssetList(); });

//}

//A function to get a list of all the assets and write them to the Div with the AssetList Div 

function getAssetList() {

    //Replace the current HTML in that div with a loading message 

    $('#AssetList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

    $.getJSON(RAAURI, function (data)

    {
        //Create an array to hold all the retrieved assets 

        var items = [];
        
        //Iterate through the returned records and build HTML, incorporating the key values of the record in the data 

        $.each(data[0], function (key, val) {
            items.push("EmailAddress: " + val["EmailAddress"]
                + ", Password: " + val["Password"] + "<br/>");

            items.push("UserType: " + val["UserType"]  + "<br/>");
            items.push('<button type="button" id="CreatorSignIn" class="btn btn-danger" onclick="authontication(' + val["EmailAddress"] + ')">SignIn</button> <br/><br/>');

        });
        var emailId = document.getElementsByName("EmailAddress").values
        var emailId = document.getElementsByName("Password").values

        for (i = 0; i < items.length; i++) {
            if (emailId == items[i].emailId && Password == items[i].Password) {
                console.log(EmailAddress + "is sign in")
                return
            }
        }
        console.log("incorrect Email or Password")
        //Clear the assetlist div 

        $('#AssetList').empty();

        //Append the contents of the items array to the AssetList Div
        
        $("<ul/>", { "class": "my-new-list", html: items.join("") }).appendTo("#AssetList");
    });
}


//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteAsset(id){
    $.ajax({
        type: "DELETE", //Note the need to concatenate the 
         url: DIAURI0 + id + DIAURI1,
    }).done(function (msg) { //On success, update the assetlist. 
       getAssetList();
    });

}

function authontication(emailId) {
    
    $.ajax({
        type: "SELECT", //Note the need to concatenate the 
        url: RIAURI0 + emailId + RIAURI0,
    }).done(function (msg) { //On success, update the assetlist.
        print("Sucesssssssssssss");
        if (val["UserType"] = "Creator") {
                Navigator: "Creator/index.html"
        }
        if (val["UserType"] = "Consumer") {

            Navigator: "Consumer/index.html"
        }
       
    });

}
