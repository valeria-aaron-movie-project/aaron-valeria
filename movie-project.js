const moviesURL = "https://wide-past-waltz.glitch.me/movies";

let movieData = [];

//Beginning of Patch work
let modifyEvil = {
    title: "Resident Evil"

}
let modifyDown = {
    title: "Black Hawk Down"
}

let modifyTenet = {
    title: "Tenet"
}

let modifyBoo = {
    title: "Breakin'2,"
}

const patchEvil = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(modifyEvil)
}

const patchTenet = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(modifyTenet)
}

const patchDown = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(modifyDown)
}

const patchBoo = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(modifyBoo)
}

const deleteOptions = {
    method: 'DELETE',
    headers: {
        'Content-Type' : 'application/json'
    }
}



buildMovies()

fetch(moviesURL+ "/2", patchDown).then(getMovies);
fetch(moviesURL+ "/3", patchTenet).then(getMovies);
fetch(moviesURL+ "/4", patchEvil).then(getMovies);
fetch(moviesURL+ " ", patchBoo).then(getMovies);

//Event listening for delete button
$(document).on("click", ".delete-movie", function(){
    let movieID=$(this).parents(".movie-card").attr("data-id")
    console.log(movieID);
    deleteMovie(movieID)
});

//Adding a Movie
$('#submit-movie-name').click(function(e){
    e.preventDefault();
    let userInput = $(".add-info").val()
    let movieTitle = $(".movie-add-title").val()
    let movieRating = $(".movie-rating").val()
    let movieYear = $("#movie-add-year").val()
    let movieGenre = $("#movie-add-genre").val()
    let moviePlot = $("#movie-add-plot").val()


    //userInput = postTitle(userInput);
    userInput = {
        "title": movieTitle,
        "rating": movieRating,
        "year": movieYear,
        "genre": movieGenre,
        "plot": moviePlot,
        "id": ""
    }
    fetch(url,  {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInput)
    })
        .then(response => response.json())
        .then(movies =>{
            let movieInfo = movies.map(movie => movie.title);
            console.log(movieInfo);
            if (!movieTitles.includes(userInput)) {
                fetch(`https://wide-past-waltz.glitch.me/movies`)
                    .then(response => response.json())
                    .then(result => {
                        let getInfo = {
                            title: result.title,
                            rating: result.rating
                        }
                        console.log(getInfo);
                    });
            }
        });
});


// Change #form1 to the id of the form that houses your input fields
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
                <h3 class="title">
                    ${movie.title}
                </h3>
                <div class="movie-year">Released: ${movie.year}</div>
                <button class="delete-movie">Delete</button>
                <button class="edit-movie">Edit</button>
                <input type="text" class="edit-content"></input>
            </div>`
        return movieCard;
    });
    $(".movie-layout").html(moviesHTML);
}

//Function to delete movie
async function deleteMovie(movieID){
    await fetch(moviesURL + `/${movieID}`, deleteOptions).then(results => results);
    buildMovies();
}






