
// WHAT I DID WALKTHROUGH //

// First I created a function that would render the movie images on the nav element by assigning a variable to the nav, then creating an image element that I set the src equal to the image url in the movie json data, which I appended to the DOM
// Then I made a fetch function which takes in a json data url and returns the fetch and the json data
// Then I called the fetch function and passed in the json url, and chained on a .then() that got the movie data from the json server and iterated across the movies that I got back to render them as images in the nav by passing in my callback function (of renderMovieImage)
// Then I added an event listener to the image variable so that when it is clicked, it console.logs the data of the movie clicked to make sure I was getting the correct data
// Then I created a new function that renders the movie to the DOM by naming variables for each key in the json data and setting their text content to the key.value from the json data
// Then I wrote a conditional statement for the watched button that sets its text content based on the truthy-ness of the boolean of its key.value from the json data
//Then I passed my renderMovie function into the image event listener so that when it's clicked it renders the movie to the DOM
// Then I added an event listener to the watched button that listens for a click and passes in a toggle callback function
// Then I wrote a toggle function that toggles between watched and unwatched based on the current value of the button, and passed that into the event listener
// Then I added an event listener to the blood form that listens for a submit and passes in a call back function that handles the submit
// Then I wrote a handle submit function for the blood form that sets the value of the blood_amount id equal to the current value + the submit value (parsed as an integer) and passed that into the event listener as a callback 

// For each movie returned from http://localhost:3000/movies create an image and add it to the movie-list nav element. 

const nav = document.querySelector('#movie-list') // moved into global scope so that it doesn't query select the nav every time we iterate

function renderMovieImage(movie) {
    const image = document.createElement('img')
    image.src = movie.image
    nav.append(image)
    
    image.addEventListener('click', () => renderMovie(movie))
}

function getMovies(url) {
    return fetch(url) 
    .then(res => res.json())
    .catch(error => console.log(error))
}

getMovies('http://localhost:3000/movies')
.then((movieArr) => {
    movieArr.forEach(renderMovieImage)
    renderMovie(movieArr[0])
})


// As soon as the page loads, we should see the details of the first movie in the dataset.

const title = document.querySelector('#title')
const yearReleased = document.querySelector('#year-released')
const description = document.querySelector('#description')
const detailImage = document.querySelector('#detail-image')
const bloodAmount = document.querySelector('#amount')
const watchedButton = document.querySelector('#watched')
const bloodForm = document.querySelector('#blood-form')
const bloodInput = document.querySelector('#blood-amount')

function renderMovie(movie) {
    clickedMovie = movie
    title.textContent = movie.title
    yearReleased.textContent = movie.release_year
    description.textContent = movie.description
    detailImage.src = movie.image
    bloodAmount.textContent = movie.blood_amount
    
  let watchVal = movie.watched ? "Watched" : "Unwatched"
  watchedButton.textContent = watchVal
        
}

let clickedMovie
watchedButton.addEventListener('click', toggleWatched)

function toggleWatched() {
    clickedMovie.watched = !clickedMovie.watched
    if (clickedMovie.watched) {
        watchedButton.textContent = "Watched"
    } else {
        watchedButton.textContent = "Unwatched"
    }
}

bloodForm.addEventListener('submit', handleBloodSumbit)

function handleBloodSumbit(e) {
    e.preventDefault()
    const newBlood = parseInt(e.target["blood-amount"].value)
    clickedMovie.blood_amount += newBlood
    renderMovie(clickedMovie)
    e.target.reset()
}

//When you click on each movie image in the top nav, you should populate the detail area with the image, title, release_year, description, watched, and blood_amount for the movie that was clicked.
//If the value of 'watched' is false, the button should say 'Unwatched'. If the value is true, then the button should say 'Watched'.


// When you click on the button in the details it should toggle between Watched or Unwatched depending on the value of watched for the movie currently being displayed.
// The watched value should stay the same when you click between the different movies.



//On the right side there's a form that allows the user to enter a number of blood drops to add to each movie (don't ask why). For each movie, I should be able to add more drops.



// Example:

// If the value is 0 and I enter 10, then number of drops for the movie should be 10.
// If the value is 20 and I enter 5, then the number of drops for the movie should be 25.
// The blood amount value should stay the same when you click between the different movies.