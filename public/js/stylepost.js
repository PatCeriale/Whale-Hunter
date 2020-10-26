document.getElementById("upload_style_widget").addEventListener("click", function() {

    cloudinary.openUploadWidget({ cloud_name: 'crowandrew', upload_preset: 'rndheh5h'},
            function(error, result) {
                if (result.event === "success"){
                    console.log("SUCCESS FUCKER");
                    console.log(result.info.url);
                    document.getElementById('url_style_text').value = result.info.url;
                }
            });

}, false);