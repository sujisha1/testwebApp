//The URIs of the REST endpoint
IUPS = "https://prod-18.northeurope.logic.azure.com:443/workflows/cb607020f50c4a2694375b57a0c271e2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=P_qmxS2Xz_JwjTWDKUeWm2ZxZj_ucIydnEmOLpNDaD0";
RAI = "https://prod-28.northeurope.logic.azure.com:443/workflows/89805f3455e34df1b6406c4604a4b509/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mXW3FZESvzu57cmqdCZPTivtrc0bDZwnLSaKhWozbT4";

BLOB_ACCOUNT = "https://blobvideostoragehome.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retVideos").click(function(){

      //Run the get asset list function
      getMovies();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 

function submitNewAsset() {

    //Create a form data object 

    submitData = new FormData(); //Get form variables and append them to the form data object

    submitData.append('FileName', $('#FileName').val());

    submitData.append('userID', $('#userID').val());

    submitData.append('userName', $('#userName').val());

    submitData.append('genre', $('#genre').val());

    submitData.append('producer', $('#producer').val());

    submitData.append('publisher', $('#publisher').val());

    submitData.append('title', $('#title').val());

    submitData.append('ageRating', $('#ageRating').val());


    submitData.append('File', $("#UpFile")[0].files[0]);

    //Post the form data to the endpoint, note the need to set the content type header 

    $.ajax({

        url: IUPS,
        data: submitData,
        cache: false,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (data) { }
    });
}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getMovies(){
    //Replace the current HTML in that div with a loading message
    $('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

    $.getJSON(RAI, function (data) {

        //Create an array to hold all the retrieved assets
        var items = [];

        //Iterate through the returned records and build HTML, incorporating the key values of the record in the data 

        $.each(data, function (key, val) {

            items.push("<hr />");
            /*items.push("<video src='" + BLOB_ACCOUNT + val["filepath"] + "' width='400'/> <br />")*/
            items.push("<video controls width='320'> <source src='" + BLOB_ACCOUNT + val["filePath"] + "' height='40'/> </video> <br />");
            items.push("File : " + val["fileName"] + "<br />");
            items.push("Uploaded by: " + val["userName"] + " (user id: " + val["userID"] + ")<br />");

            items.push("Genre : " + val["genre"] + "<br />");
            items.push("Producer : " + val["producer"] + "<br />");
            items.push("Publisher : " + val["publisher"] + "<br />");
            items.push("Title : " + val["title"] + "<br />");
            items.push("Age Rating : " + val["ageRating"] + "<br />");

            items.push("<hr />");

        }); 
        //Clear the assetlist div 

        $('#VideoList').empty();

        //Append the contents of the items array to the ImageList Div

        $("<ul/>", { "class": "my-new-list", html: items.join("") }).appendTo("#VideoList");
    });
}