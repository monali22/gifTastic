var arrAnimals = ['cats','dogs','elephant'];
$(document).ready(function(){

    for(var i=0;i<arrAnimals.length;i++){
        var aniButton = $("<button>");
        aniButton.text(arrAnimals[i]);
        aniButton.attr("name",arrAnimals[i]);
        $("#buttonArea").append(aniButton);
    }

   $("button").on('click',function(event){

        $("#imageSec").empty();

        //alert($(this).attr("name"));

        queryUrl = "http://api.giphy.com/v1/gifs/search?q="+$(this).attr("name")+"&api_key=NtiLcHdbo2uuvHk6exvYQDfjaLWM1gLe&limit=10";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response){
            //console.log(response.data.image_original_url);
            var items = response.data;
            console.log(response);
            for(var i=0;i<10;i++){

                var image = $("<img>");
                image.attr("src",items[i].images.downsized_still.url);
                image.attr("class","gif");
                image.attr("data-state","still");
                image.attr("data-still",items[i].images.fixed_height_still.url);
                image.attr("data-animate",items[i].images.fixed_height.url)
                console.log($(".gif"));
                $("#imageSec").append(image);
            }
           
        })
       // console.log("yaaaaa");

    });


    $("img").on("click", function(event) {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        console.log("yaaaaa");
    
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    


    


});



