let moviesURL = "https://wide-past-waltz.glitch.me/movies";
let movieData = [];

// Loading movies
$(document).ready(function(){
    console.log("Document is Ready")
    buildMovies();
});

//Event listening for delete button
$(document).on("click", ".delete-movie", function(){
    let movieID=$(this).parents(".movie-card").attr("data-id")
    console.log(movieID);
    deleteMovie(movieID)
});

$(document).on("click", ".edit-movie", function(){
    let movieID=$(this).parents(".movie-card").attr("data-id")
    console.log(movieID);
    editMovie(movieID)
});

// Global variable for option to delete
const deleteOptions = {
    method: 'DELETE',
    headers: {
        'Content-Type' : 'application/json'
    }
}




//Adding a Movie with event listener and POST option
$(document).on('click', "#add-movie-button",function(e){
    $("[data-bs-dismiss=\"modal\"]").trigger("click");
    console.log("test inside add movie button");
    e.preventDefault();
    // let userInput = $(".add-info").val()
    let movieTitle = $("#movie-add-title").val()
    let movieRating = $(".movie-rating[name='rating']:checked").val()
    let movieYear = $("#movie-add-year").val()
    let movieGenre = $("#movie-add-genre").val()
    let moviePlot = $("#movie-add-plot").val()

    //userInput = postTitle(userInput);
    userInput = {
        "title": movieTitle,
        "rating": movieRating,
        "year": movieYear,
        "genre": movieGenre,
        "plot": moviePlot
    }
    console.log(userInput);
    fetch(moviesURL,  {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInput)
    })
        .then(response => response.json())
        .then(movies => {
            console.log(movies);
            buildMovies();
        })
});

//EDIT = Update
$(document).on('click', ".edit-movie", function() {
    let $parentCard = $(this).parents(".movie-card");
    let changeTitle=$parentCard.find(".movie-title").text();
    let changeYear=$parentCard.find(".movie-year").text();
});

// Modal that contains user input for a movie
$('#modal-div').submit((e) => {
    e.preventDefault();

    let addMovie = {
        title: $("#movie-add-title").val(), // change
        genre: $("#movie-add-genre").val(), // change
        rating: $(".movie-rating").val(), // change
        plot: $("#movie-add-plot").val(), //change
    }
    console.log("this is the add movie log")
    console.log(addMovie)

    let postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addMovie)
    }

    // POST movie
    fetch(moviesURL, postOptions)
        .then(resp => resp.json())
        .then(moviePosters => {
            console.log(moviePosters);
            buildMovies();
        }).catch(error => console.log(error))

});

//Function to get movies from array
async function getMovies() {
    try {
        let response = await fetch(`https://wide-past-waltz.glitch.me/movies`);
        let events = await response.json();
        return(events);
    }
    catch(err) {
        console.log(err);
    }
}
//Function to build movie cards
async function buildMovies(){
    let movies = await getMovies()
    console.log(movies);
    let moviesHTML = movies.map(function(movie, index) {
        let movieCard =
                `<div class="movie-card" data-id="${movie.id}">
                <div class="movie-pic-wrapper">
                    <img class="movie-pic" src="${movie.poster}" />
                </div>
                <h3 class="movie-title">
                    ${movie.title}
                </h3>
                <div class="movie-year">Released: ${movie.year}</div>
                <button class="delete-movie">Delete</button>
                <button class="edit-movie" data-bs-toggle="modal" data-bs-target="#modal-div">Edit</button>
            </div> `
        return movieCard;
    });
    $(".movie-layout").html(moviesHTML);
}

//Function to delete movie
async function deleteMovie(movieID){
    await fetch(moviesURL + `/${movieID}`, deleteOptions).then(results => results);
    buildMovies();
}
//Variable for option to edit
async function editMovie(movieID){
    getMovies().then(movies =>{
        for(let movie of movies){
           if(movie.id === parseInt(movieID)){
               $("#movie-add-title").attr("value", movie.title)
               $("#movie-add-year").attr("value", movie.year)
               $("#add-movie-button").attr("id", "edit-movie-button")
           }
       }
    });
        $(document.body).on("click", "#edit-movie-button", function(){
            let newMovie = {
                title:  $("#movie-add-title").val(),
                year:   $("#movie-add-year").val()
            }
            const editOption = {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(newMovie)
            }
            fetch(moviesURL + `/${movieID}`, editOption)
                .then(results => results.json())
                .then(data => {
                    buildMovies();
                });

        })

}





