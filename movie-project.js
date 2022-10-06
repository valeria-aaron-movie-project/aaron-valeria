const moviesURL = "https://wide-past-waltz.glitch.me/movies";

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
    let userInput = $(".add-info");

    userInput = postTitle(userInput);
    fetch(url)
        .then(response => response.json())
        .then(movies =>{
            let movieTitles = movies.map(movie => movie.title);
            console.log(movieTitles);
            if (!movieTitles.includes(userInput)) {
                fetch(`https://api.themoviedb.org/3/movie/550?${userInput}&api_key=645b38e1878365520d13e700f91090b6`)
                    .then(response => response.json())
                    .then(result => {
                        let getInfo = {
                            title: result.Title,
                        }
                        console.log(getInfo);
                    })
            }
        })
})


// $('#add-movie').submit((e)=>{
//     e.preventDefault();
//     let addMovie = {
//         title: $("#title").val()
//     }
//     console.log("Is this working?")
//     console.log(addMovie)
//     let addOptions = {
//         method: 'POST',
//         headers: {
//             'Content-type' : 'applications/json'
//         },
//         body: JSON.stringify(addMovie)
//     }
//     fetch(moviesURL, addOptions)
//         .then(resp =>resp.json())
//         .then(buildMovies => {
//             console.log(buildMovies);
//             moviesURL();
//         }).catch(error => console.log(error))
// });




// $('#form1').submit((e) => {
//     e.preventDefault();
//     let addMovie = {
//         title: $("#title").val(),
//         genre: $("#genre").val(),
//         rating: $("#rating").val(),
//         plot: $("#plot").val(),
//     }
//     console.log("this is the add movie log")
//     console.log(addMovie)
//     let postOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(addMovie)
//     }
//     // POST movie
//     fetch(moviesURL, postOptions)
//         .then(resp => resp.json())
//         .then(moviePosters => {
//             console.log(moviePosters);
//             movieGlitch();
//         }).catch(error => console.log(error))
// });

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






