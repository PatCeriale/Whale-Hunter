document.getElementById("upload_widget").addEventListener("click", function() {

    cloudinary.openUploadWidget({ cloud_name: 'crowandrew', upload_preset: 'rndheh5h'},
            function(error, result) {
                if (result.event === "success"){
                    document.getElementById('url_text').value = result.info.url;
                    document.getElementById('url_img').src = "https://res.cloudinary.com/crowandrew/image/upload/h_500,w_400,c_fit/" + result.info.path;
                }
            });

}, false);

const inputTitle = document.getElementById('inputTitle');

inputTitle.onkeyup = function(){
    document.getElementById('postTitle').innerHTML = inputTitle.value;
}

const inputDescription = document.getElementById('inputDescription');

inputDescription.onkeyup = function(){
    document.getElementById('postDescription').innerHTML = inputDescription.value;
}

const inputBeerName = document.getElementById('inputBeerName');

inputBeerName.onkeyup = function(){
    document.getElementById('postBeerName').innerHTML = inputBeerName.value;
}

const inputBreweryName = document.getElementById('inputBreweryName');

inputBreweryName.onkeyup = function(){
    document.getElementById('postBreweryName').innerHTML = inputBreweryName.value;
}