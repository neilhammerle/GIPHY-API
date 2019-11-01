$(document).ready(function() {
    var topics = ["Cats", "Dogs", "Birds", "Cows", "Chickens", "Pigs", "Goats"];
    function renderButtons() {
        $("#animalsButtons").empty();
        for (var i = 0; i< topics.length; i++){
            var inBtn = $("<button>");
            inBtn.attr("data-name", topics[i]);
            inBtn.text(topics[i]);
            $("#animalsButtons").append(inBtn);
            
        }
    };

$("#add-animal").on("click", function(event) {
    event.preventDefault();
    var added = $("#animal-input").val().trim();
    topics.push(added);
    console.log(topics);
    renderButtons();
    fetch ();
    $("#animal-form").find("input:text").val("");
});
renderButtons();

function fetch() {
    $("button").on("click", function() {
        $("#gifs-here").empty();
        var animal = $(this).attr("data-name");
        console.log(this);

        var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
        console.log(queryURL);
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");
            var rated = $("<p>").text("Rating: "+ results[i].rating);
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-state", "still");

            animalImage.on("click", function(){
                var state = $(this).attr("data-state");
                if (state === "still"){
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                };
            });
            animalDiv.append(rated);
            animalDiv.append(animalImage);
            $("#gifs-here").prepend(animalDiv);

            
            }
        });
    });
};
        fetch();

});