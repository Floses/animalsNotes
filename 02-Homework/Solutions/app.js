// Setting our function to start on page load here

$(document).ready(function() {
  // this is creating a variable called animals and setting it's value to an array of different animals.
  var animals = [
    "dog",
    "cat",
    "rabbit",
    "hamster",
    "skunk",
    "goldfish",
    "bird",
    "ferret",
    "turtle",
    "sugar glider",
    "chinchilla",
    "hedgehog",
    "hermit crab",
    "gerbil",
    "pygmy goat",
    "chicken",
    "capybara",
    "teacup pig",
    "serval",
    "salamander",
    "frog"
  ];

  // creating a function called populateButtons and passing through 3 seperate variables: arraytoUse, classToAdd, areaToAddTo
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    // taking the variable areaToAddTo and emptying it out in the html
    $(areaToAddTo).empty();
    // creating a for loop and having it loop through arrayToUse
    for (var i = 0; i < arrayToUse.length; i++) {
      // creating variable a and giving it the value of an html button using jquery
      var a = $("<button>");
      // giving our variable a, ( the created button) a class equal to our varible classToAdd
      a.addClass(classToAdd);
      // setting the attributes of our created button to give it the data-type of the value of our arrayToUse
      a.attr("data-type", arrayToUse[i]);
      // here we are also giving it text of whatever the value of our arrayToUse currently is
      a.text(arrayToUse[i]);
      // finally we are taking our completed button and appending it into areaToAddTo in our html
      $(areaToAddTo).append(a);
    }
  }
  // Here we have an on click functin for our document, referencing the animal-button html
  $(document).on("click", ".animal-button", function() {
    // When the button is clicked, do the following
    // take our animals div and empty it
    $("#animals").empty();
    // take away the class from our .animal-button called active
    $(".animal-button").removeClass("active");
    // adding the active class back to our button
    $(this).addClass("active");
    // creating a var called type and giving it a value equal to the data-type attribute of our previous button
    var type = $(this).attr("data-type");
    // here we create a var called queryURL that has a value equal to the giphy api that we are going to use
    var queryURL =
      // here we say, this is the api we are referencing
      "http://api.giphy.com/v1/gifs/search?q=" +
      // however here we want to add "type" which is our above variable for whatever button we have added, i.e. search term of button name
      type +
      // this ends the url with our api key access and a limit to how many times we can acquire said value from the api
      "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    // here is our Asynchronous Javascript and Xml call
    $.ajax({
      // setting the value of our url to the variable queryURL which contains our api
      url: queryURL,
      // using the ajax "GET" method to pull the information from our afformentioned api
      method: "GET"
      // here is our promise when we pull our info as a function response
    }).then(function(response) {
      // create a var called results and give it the value of our api data reference
      var results = response.data;
      // creating a for loop to search through our data pulled from the api
      for (var i = 0; i < results.length; i++) {
        // creating a variable called animalDiv and giving it a value of jquery html div with class animal-item
        var animalDiv = $('<div class="animal-item">');
        // creating another variable called rating which is equal to our above pulled data object and whatever value is stored in its rating category
        var rating = results[i].rating;
        // creating variable p which will create a paragraph in our html with text value equal to that of our results rating

        var p = $("<p>").text("Rating: " + rating);
        // creating a variable called animated and giving it a value equal to our objects original gif url
        var animated = results[i].images.fixed_height.url;
        // creating a variable called still and giving it a value of our objects still image url
        // both variables animated and still will come into play when we want to stop or play our called upon gifs
        var still = results[i].images.fixed_height_still.url;
        // creating a var called animalImage and giving it a value of jquery html img tag
        var animalImage = $("<img>");
        // here we give our animalImage, attributes of src, still, so that it will show up with the value of our still variable
        animalImage.attr("src", still);
        // we also give it the attribute of data-still so we can make the image stop whenever we want
        animalImage.attr("data-still", still);
        // here we give it the attribute of animate so we can animate our giphy image
        animalImage.attr("data-animate", animated);
        // lastly we give our image a data-state of still
        animalImage.attr("data-state", "still");
        // now we add a class to our animalImage of "animal-image"
        animalImage.addClass("animal-image");
        // here we append our paragraph text of said image to show the rating into our html animalDiv
        animalDiv.append(p);
        // and here we append the image for said animal into our animalDiv
        animalDiv.append(animalImage);
        // now in our html animals section we append our entire animalDiv with ratings and images all in one
        $("#animals").append(animalDiv);
      }
    });
  });
  // setting an on-click event for our animal image
  $(document).on("click", ".animal-image", function() {
    //this var called state is equal to the data-state value of the defined image above
    var state = $(this).attr("data-state");
    // here we are saying that if the data state of our image is still ( un-moving )
    if (state === "still") {
      // give the image the attribute of data-animate
      $(this).attr("src", $(this).attr("data-animate"));
      // give the image the attribut of being in the "animate" state
      $(this).attr("data-state", "animate");
      // if the attribute is already set to the animate state
    } else {
      // set the src attribute to data-still
      $(this).attr("src", $(this).attr("data-still"));
      // give the image a data-state of still
      $(this).attr("data-state", "still");
    }
  });
  // here we call upon our html add-animal and give it an on-click function event
  $("#add-animal").on("click", function(event) {
    // default action of the event will not be triggered
    event.preventDefault();
    // setting variable newAnimal to the value of the user input
    var newAnimal = $("input")
      // .eq selects the element at index 0
      .eq(0)
      // we want to read the value of our input
      .val();
    // here we say that if our newAnimal ( user-input ) is greater than 2
    if (newAnimal.length > 2) {
      // we push the newAnimal input into our array of animals
      animals.push(newAnimal);
    }
    // calling our function to populate a new set of buttons and show our newly updated array
    populateButtons(animals, "animal-button", "#animal-buttons");
  });
  // calling our function to populate all of our buttons
  populateButtons(animals, "animal-button", "#animal-buttons");
});
