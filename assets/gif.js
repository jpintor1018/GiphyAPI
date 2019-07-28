$(document).ready(function(){
    var starters = [ "Charmander", "Squirtle", "Pikachu", "Bulbasaur"];
    
    for(let i=0; i<starters.length; i++)
    {
        
        $("#Btn-section").append("<button>" + starters[i] + "</button>")
        $("button").attr("data-SSB", starters[i])
        $("button").addClass("playable")
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
            var smashDiv = $("<div>");
            var rating = $("<p>").text("Rating: " + results[j].rating);
            var charImage = $("<img>")
            charImage.attr("src", results[j].images.fixed_height.url);
            smashDiv.append(rating);
            smashDiv.append(charImage);
            $("#gif-section").prepend(smashDiv);
        }

    });
        };

        $(document).on("click", ".playable", display);

        smashButton();

    })

