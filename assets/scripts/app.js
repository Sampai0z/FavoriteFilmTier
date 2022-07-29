const addMovieModal = document.getElementById('add-modal'); //const addMovieModal = document.body.children[1];
const startAddMovieButton = document.querySelector('header button'); // poderia ser ao invés do botão .lastElementChild;
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInput = addMovieModal.querySelectorAll('input');
const deleteMovieModal = document.getElementById('delete-modal');
const entryTextSection = document.getElementById('entry-text');
const cancelDeleteMovieModal = deleteMovieModal.querySelector('.btn--passive');
let confirmDeleteMovieModal = deleteMovieModal.querySelector('.btn--danger');

const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block'
    } else {
        entryTextSection.style.display = 'none'
    }
};

const deleteMovie = movieId => {
    let movieIndex = 0;
    for (const movie of movies) {
        if(movie.id === movieId){
          break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove(); /* // this is a modern aproach.
    //listRoot.removeChild(listRoot.children[movieIndex]); //---- This is another alternative to remove the movie. */
    cancelMovieDeletion();
    updateUI();
};

const deleteMovieHandler = movieId => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
        // To solve the error:
        confirmDeleteMovieModal.replaceWith(confirmDeleteMovieModal.cloneNode(true));
        confirmDeleteMovieModal = deleteMovieModal.querySelector('.btn--danger');

        cancelDeleteMovieModal.removeEventListener('click', closeMovieModal);
        //changed code to finish te Error. 

    cancelDeleteMovieModal.addEventListener('click', cancelMovieDeletion);
   /*  confirmDeleteMovieModal.addEventListener('click', () => {
        cancelMovieDeletion();
        deleteMovie(movieId);
    }) */ // MEU METODO, POREM DA UM ERRO: TYPE ERROR properties of undefined (reading 'remove')
    //deleteMovie(movieId);
    confirmDeleteMovieModal.addEventListener('click', deleteMovie.bind(null, movieId))  
};

const cancelMovieDeletion = () => {
    deleteMovieModal.classList.remove('visible');
    backdrop.classList.remove('visible');
};

const renderNewMovieElement = (id,title,imageUrl,rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}" >
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
    backdrop.classList.remove('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
}

const toggleMovieModal = () =>{
    addMovieModal.classList.toggle('visible'); //add in css 'visible' it is disable.
    toggleBackdrop();
};

const cancelMovieButtonHandler = () => {
    closeMovieModal();
    clearMovieInput();
};

const clearMovieInput = () => {
    // userInput[0].value = ''; OR USING FOR: 
    for (const userInputs of userInput) {
        userInputs.value = '';
    }
};

const addMovieHandler = (e) => {
    const titleValue = userInput[0].value;
    const imageUrlValue = userInput[1].value;
    const ratingValue = userInput[2].value;

    if (
        titleValue.trim() === "" ||
        imageUrlValue.trim() === "" ||
        ratingValue.trim() === "" ||
        +ratingValue < 1 ||
        +ratingValue > 5
        ) {
        alert('Please enter valid values (rating between 1 and 5).');
        return
    }

    const newMovie = {
        id: Math.random().toString(), //It's gonna generate probabily the same Id but it doesn't matter for this demo.
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    clearMovieInput();
    renderNewMovieElement(newMovie.id,newMovie.title,newMovie.image,newMovie.rating);
    updateUI();
};

const backdropClickHAndler = () => {
    closeMovieModal();
    cancelMovieDeletion();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHAndler);
cancelAddMovieButton.addEventListener('click', cancelMovieButtonHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
