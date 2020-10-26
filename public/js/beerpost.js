document.getElementById("upload_beer_widget").addEventListener("click", function() {

    cloudinary.openUploadWidget({ cloud_name: 'crowandrew', upload_preset: 'rndheh5h'},
            function(error, result) {
                if (result.event === "success"){
                    document.getElementById('url_beer_text').value = result.info.url;
                }
            });

}, false);