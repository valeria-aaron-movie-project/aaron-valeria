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
                <div class="movie-year">${movie.year}</div>
            </div>`
        return movieCard;
    });
    $(".movie-layout").append(moviesHTML);
}


