//The URIs of the REST endpoint
RAAURI = "";
CIAURI = "https://prod-31.northeurope.logic.azure.com/workflows/72c8f3e09db645f7afd488e96d5b63b8/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=T4WCBys-vlafV2KHw6jZ6WSpsANvr2xu73L-AkOefhw";

DIAURI0 = "";
DIAURI1 = "";


//Handlers for button clicks
$(document).ready(function() {

 
  $("#retAssets").click(function(){

      //Run the get asset list function
      getAssetList();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

function submitNewAsset(){

//Construct JSON Object for new item
    var subObj = {

    FirstName: $('#FirstName').val(),
    Surname: $('#Surname').val(),
    EmailAddress: $('#EmailAddress').val(),
    UserType: $('#UserType').val(),
    Password: $('#password').val(),
    Age: $('#Age').val()
}

//Convert to a JSON String
subObj = JSON.stringify(subObj);

//Post the JSON string to the endpoint, note the need to set the content type header
$.post({ url: CIAURI, data: subObj, contentType: 'application/json; charset=utf-8' }).done(function (response) { getAssetList(); });

}
//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getAssetList(){

  //Replace the current HTML in that div with a loading message
  $('#AssetList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  //Get the JSON from the RAA API 
  $.getJSON(RAAURI, function( data ) {

    //Create an array to hold all the retrieved assets
    var items = [];
      
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    
      $.each(data[0], function (key, val) { items.push("FirstName: " + val["FirstName"] + "<br/>"); items.push("Surname: " + val["Surname"] + ", EmailAddress: " + val["EmailAddress"] + "<br/>"); items.push("UserType: " + val["UserType"] + "<br/>"); items.push("password: " + val["password"] + "<br/>"); items.push("Age: " + val["Age"] + "<br/>"); items.push('<button type="button" id="subNewForm" class="btn btn-danger" onclick="deleteAsset(' + val["UserID"] + ')">Delete</button> <br/><br/>'); });
      //Clear the assetlist div 
      $('#AssetList').empty();

      //Append the contents of the items array to the AssetList Div
      
    });
}

//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteAsset(id){

}
