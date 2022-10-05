buildMovies()

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

async function buildMovies(){
    let movies = await getMovies()
    console.log(movies);
    let moviesHTML = movies.map(function(movie, index) {
        let movieCard = `<div class="movie-card">
                <div class="movie-pic-wrapper">
                    <img class="movie-pic" src="${movie.poster}" />
                </div>
                <h3 class="title">
                    ${movie.title}
                </h3>
                <div class="movie-year">Released: ${movie.year}</div>
            </div>`
        return movieCard;
    });
    $(".movie-layout").append(moviesHTML);
}

const moviesURL = "https://wide-past-waltz.glitch.me/movies";

let modifyEvil = {
    title: "Resident Evil"

}
let modifyDown = {
    title: "Black Hawk Down"
}

let modifyTenet = {
    title: "Tenet"
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

fetch(moviesURL+ "/2", patchDown).then(getMovies);
fetch(moviesURL+ "/3", patchTenet).then(getMovies);
fetch(moviesURL+ "/4", patchEvil).then(getMovies);
