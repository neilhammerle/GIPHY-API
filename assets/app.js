$(document).ready(function() {
    var topics = ["Cats", "Dogs", "Birds", "Cows", "Chickens", "Pigs", "Goats"];
    function  renderButtons() {
        $("#animalsButtons").empty();
        for (var i = 0; i< topics.length; i++){
            var inBtn = $("<button>");
            inBtn.attr("data-name", topics[i]);
            $("#animalsButtons").append(inBtn);
            
        }
    };
});