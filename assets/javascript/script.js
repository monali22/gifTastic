var arrAnimals = ['elephant','cat','dog'];
$(document).ready(function(){
    loadBtns();
    function loadBtns(){
        $('#buttonArea').empty();
        for(var i=0;i<arrAnimals.length;i++){
            var aniButton = $("<button>");
            aniButton.text(arrAnimals[i]);
            aniButton.attr("name",arrAnimals[i]);
            $("#buttonArea").append(aniButton);
        }
        play();

    }

    
    $("#submitBtn").on('click',function(){
        
        var nameVal =$("#addval").val();
        arrAnimals.push(nameVal);
        loadBtns();
    
    });

    function play(){
        $("button").on('click',function(event){
    
            $("#imageSec").empty();
        
           // alert($(this).attr("name"));
            console.log($(this).attr("name"));
            queryUrl = "http://api.giphy.com/v1/gifs/search?q="+$(this).attr("name")+"&api_key=NtiLcHdbo2uuvHk6exvYQDfjaLWM1gLe&limit=20";
        
            $.ajax({
                url: queryUrl,
                method: "GET"
            }).then(function(response){
                //console.log(response.data.image_original_url);
                var items = response.data;
                //console.log(response);
                for(var i=0;i<20;i++){
        
                    var image = $("<img>");
                    image.attr("src",items[i].images.downsized_still.url);
                    image.css({"height":"200px","width":"200px"});
                    image.attr("class","gif");
                    image.attr("data-state","still");
                    image.attr("data-still",items[i].images.fixed_height_still.url);
                    image.attr("data-animate",items[i].images.fixed_height.url)
                    //console.log(items[i]);
                    $("#imageSec").append(image);
                }
    
                $("img").on("click", function(event) {
                    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                    var state = $(this).attr("data-state");
                    console.log(state);
                
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
               
            })
            console.log("yaaaaa");
           $("img").click(function(){
    
            //alert("yaaaayay");
    
        });
    
        
        });
    }
    
});


