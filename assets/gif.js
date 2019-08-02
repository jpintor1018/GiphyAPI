$(document).ready(function(){

    var starters = [ "Bulbasaur", "Squirtle", "Charmander", "Pikachu"];
    
    for(let i=0; i<starters.length; i++)
    {
        var BTN = $("<button>");
        BTN.attr("data-SSB", starters[i])
        BTN.addClass("playable")
        BTN.text(starters[i])
        $("#Btn-section").append(BTN)
    }
    

    function smashButton(){
        $("#gif-section").empty()
        var pokeChar = $("#char-input").val();
        starters.push(pokeChar)
        var button = $("<button>");
        button.addClass("playable")
        button.attr("data-SSB", pokeChar);
        button.text(pokeChar);
        $("#Btn-section").append(button);
        }
    
    $("#add-Char").on("click", function(event){
        event.preventDefault();
        smashButton();
        $("#char-input").val("");
    })
    
    
    function display(){ 
    var Character = $(this).attr("data-SSB")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + Character + "&api_key=icgIepaX794KObAhiDbwhgz44Bg87PRk"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        var results = response.data

        for(let j=0;j<results.length;j++)
        {
            var pokeDiv = $("<div>");
            var rating = $("<p>").text("Rating: " + results[j].rating);
            var charImage = $("<img>")
            charImage.addClass("gif")
            charImage.attr("src", results[j].images.fixed_height.url);
            charImage.attr("data-still", results[j].images.fixed_height_still.url);
            charImage.attr("data-animate", results[j].images.fixed_height.url);
            charImage.attr("data-state", "still");
            pokeDiv.append(rating);
            pokeDiv.append(charImage);
            $("#gif-section").prepend(pokeDiv);
        }

        $(".gif").on("click", function() {
           var state = $(this).attr("data-state");
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } 
            else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
  

    });
        };

        $(document).on("click", ".playable", display);

        

    })

