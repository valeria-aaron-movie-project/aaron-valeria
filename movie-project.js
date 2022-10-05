//variables for books and movies
const booksURL = "https://jet-sudden-pamphlet.glitch.me/books";
const moviesURL = "https://jet-sudden-pamphlet.glitch.me/movies";

//function to get movies
function getMovies(){
    fetch("https://jet-sudden-pamphlet.glitch.me/movies")
        .then(resp => resp.json()).then(data =>console.log(data));
}

getMovies();

//The C in CRUD: Create
//Creating posts
const bookToPost = {
    title: "Greenlights",
    author: {
        firstName: "Matthew",
        lastName: "McConaughey"
    }
}

const postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookToPost)
}

function getBooks(){
    fetch(booksURL)
        .then(resp => resp.json()).then(data =>console.log(data));
}
getBooks();

//POST request
// fetch(booksURL, postOptions).then(getBooks);

//The U in CRUD: Updating with PUT and PATCH requests
//We'll use PUT to replace the entire content
//We'll use PATCH to modify only part of the entry

let modification = {
    title: "Greenlights: Blocking every red on the road"
}
const patchOptions = {
    method: 'PATCH',
    headers: {
        'Content-Type' : 'applications/json'
    },
    body: JSON.stringify(modification)
}

// fetch(booksURL + "/1", patchOptions).then(getBooks);
modification = {
    title: "The Big Nine",
    author: {
        firstName: "Amy",
        lastName: "Webb"
    }
}

// const putOptions = {
//     method: 'PATCH',
//     headers: {
//         'Content-Type' : 'applications/json'
//     },
//     body: JSON.stringify(modification)
// }
//
// fetch(booksURL + "/1", putOptions).then(getBooks);

//The D in CRUD: Delete

// const deleteOptions = {
//     method: 'DELETE',
//     headers: {
//         'Content-Type' : 'applications/json'
//     },
// }
// fetch(booksURL + "/1", deleteOptions).then(getBooks);
