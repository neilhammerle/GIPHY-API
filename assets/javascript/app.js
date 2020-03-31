$(document).ready(function () {

    //Creating an array to store values for the buttons created later
    var topics = ["Hot Dogs", "Pizza", "Icecream", "Popcorn", "Donuts", "Beer", "Gummi Bears", "Cotton Candy"];
    // Wrapping button creation into a function
    function renderButtons() {
        $("#foodButtons").empty();
        //Creating new buttons in a for loop
        for (var i = 0; i < topics.length; i++) {
            var inBtn = $("<button>");
            inBtn.attr("data-name", topics[i]);
            inBtn.text(topics[i]);
            //Rendering newly created buttons into their div
            $("#foodButtons").append(inBtn);
        }
    };

    //On-click Submit form to create new buttons 
    $("#add-food").on("click", function (event) {

        //Preventing the form performing its default post call
        event.preventDefault();

        //adding user's input into the existing array and running button creation function
        var added = $("#food-input").val().trim();
        topics.push(added);
        console.log(topics);
        renderButtons();

        //calling api function to make an api call on newly created buttons
        fetch();

        //Clearing the input field in the form once submitted
        $("#food-form").find("input:text").val("");

    });

    //Calling function to create first buttons
    renderButtons();

    //Wrapping an api call in a function
    function fetch() {
        $("button").on("click", function () {
            //clearing previously rendered gifs
            $("#gifs-here").empty();
            var food = $(this).attr("data-name");
            console.log(this);

            //assembling API call wiht link and q as well as limiting response to 10 items
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                food + "&api_key=dc6zaTOxFJmzC&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .done(function (response) {
                    console.log(queryURL);
                    console.log(response);

                    // storing the data from the AJAX request in the results variable
                    var results = response.data;
                    // Looping through each result item
                    for (var i = 0; i < results.length; i++) {
                        // Creating and storing a div tag
                        var foodDiv = $("<div>");
                        // Creating a paragraph tag with the result item's rating
                        var rated = $("<p>").text("Rating: " + results[i].rating);
                        // Creating and storing an image tag
                        var foodImage = $("<img>");
                        // Setting the src and 3 data attributes for each image
                        foodImage.attr("src", results[i].images.fixed_height_still.url);
                        foodImage.attr("data-animate", results[i].images.fixed_height.url);
                        foodImage.attr("data-still", results[i].images.fixed_height_still.url);
                        foodImage.attr("data-state", "still");
                        // creating switch logic to replace link to animated if not and to still if animated
                        foodImage.on("click", function () {
                            var state = $(this).attr("data-state");
                            if (state === "still") {
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            } else {
                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still");
                            };
                        });
                        foodDiv.append(rated);
                        foodDiv.append(foodImage);
                        //prepending ready gifs into their div container
                        $("#gifs-here").prepend(foodDiv);

                    }
                });

        });
    };

    fetch();

});