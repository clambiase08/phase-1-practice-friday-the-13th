
// WHAT I DID WALKTHROUGH //

// First I created a function that would render the movie images on the nav element by assigning a variable to the nav, then creating an image element that I set the src equal to the image url in the movie json data, which I appended to the DOM
// Then I made a fetch request in global scope which got the movie data from the json server and iterated across the movies that I got back to render them as images in the nav by passing in my callback function
// Then I added an event listener to the image variable so that when it is clicked, it fetches that movie from the json data and  console.logs the data of the movie clicked
//Then I created a new function that renders the movie to the DOM by naming variables for each key in the json data and setting their text content to the key.value from the json data
// Then I wrote a conditional statement for the watched button that sets its text content based on the truthy-ness of the boolean of its key.value from the json data
//Then I passed my renderMovie function into the image event listener fetch so that when it's clicked and the data comes back it renders the movie to the DOM




// For each movie returned from http://localhost:3000/movies create an image and add it to the movie-list nav element. 

const nav = document.querySelector('#movie-list') // moved into global scope so that it doesn't query select the nav every time we iterate

function renderMovieImage(movie) {
    const image = document.createElement('img')
    image.src = movie.image
    nav.appendChild(image)

    image.dataset.movieId = movie.id
    
    image.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/movies/${e.target.dataset.movieId}`) 
        .then(res => res.json())
        .then((clickedMovie) => renderMovie(clickedMovie))
        .catch(error => console.log(error)) 
    })
}

fetch('http://localhost:3000/movies') 
.then(res => res.json())
.then((movieArr) => movieArr.forEach(renderMovieImage))
.catch(error => console.log(error))


// As soon as the page loads, we should see the details of the first movie in the dataset.

function renderMovie(movie) {
    const title = document.querySelector('#title')
    const yearReleased = document.querySelector('#year-released')
    const description = document.querySelector('#description')
    const detailImage = document.querySelector('#detail-image')
    const bloodAmount = document.querySelector('#amount')
    const watchedButton = document.querySelector('#watched')
    const bloodForm = document.querySelector('#blood-form')
    const bloodInput = document.querySelector('#blood-amount').
    
    title.textContent = movie.title
    yearReleased.textContent = movie.release_year
    description.textContent = movie.description
    detailImage.src = movie.image
    bloodAmount.textContent = movie.blood_amount
    
    if (movie.watched) {
        watchedButton.textContent = "Watched"
    } else {
        watchedButton.textContent = "Unwatched"
    }
    
    watchedButton.dataset.movieId = movie.id
    watchedButton.addEventListener('click', (e) => {
        e.preventDefault()
        if (movie.watched) {
            watchedButton.textContent = "Unwatched"
            movie.watched = false
        } else {
            watchedButton.textContent = "Watched"
            movie.watched = true
        }
        fetch(`http://localhost:3000/movies/${watchedButton.dataset.movieId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({watched: movie.watched})
    })
    .then(res => res.json())
    .then(movie => console.log(movie.watched))
    })

    bloodForm.addEventListener('submit', (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/movies/${movie.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({movie: parseInt(e.target.value)})
    })
    .then(res => res.json())
    .then(movie => console.log(movie.blood_amount))

    })
}

fetch('http://localhost:3000/movies/1')
.then (res => res.json())
.then(movie => renderMovie(movie))
.catch(e => console.log(e))

//When you click on each movie image in the top nav, you should populate the detail area with the image, title, release_year, description, watched, and blood_amount for the movie that was clicked.
//If the value of 'watched' is false, the button should say 'Unwatched'. If the value is true, then the button should say 'Watched'.


// When you click on the button in the details it should toggle between Watched or Unwatched depending on the value of watched for the movie currently being displayed.
// The watched value should stay the same when you click between the different movies.



//On the right side there's a form that allows the user to enter a number of blood drops to add to each movie (don't ask why). For each movie, I should be able to add more drops.



// Example:

// If the value is 0 and I enter 10, then number of drops for the movie should be 10.
// If the value is 20 and I enter 5, then the number of drops for the movie should be 25.
// The blood amount value should stay the same when you click between the different movies.