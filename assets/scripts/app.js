const addMovieModal = document.getElementById('add-modal'); //const addMovieModal = document.body.children[1];
const startAddMovieButton = document.querySelector('header button'); // poderia ser ao invés do botão .lastElementChild;
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInput = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');

const movies = [];

const updateUI = function () {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block'
    } else {
        entryTextSection.style.display = 'none'
    }
};

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if(movie.id === movieId){
          break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove(); // this is a modern aproach.
    // listRoot.removeChild(listRoot.children[movieIndex]); ---- This is another alternative to remove the movie.
};

const renderNewMovieElement = (id,title,imageUrl,rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'none';
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

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

const toggleMovieModal = () =>{
    addMovieModal.classList.toggle('visible'); //adiciona no Css o visible que está desativado.
    toggleBackdrop();
};

const cancelMovieButtonHandler = () => {
    toggleMovieModal();
    clearMovieInput();
};

const clearMovieInput = () => {
    // userInput[0].value = ''; OR USING FOR: 
    for (const userInputs of userInput) {
        userInputs.value = '';
    }
};

const addMovieHandler = () => {
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
    toggleMovieModal();
    clearMovieInput();
    renderNewMovieElement(newMovie.id,newMovie.title,newMovie.image,newMovie.rating);
    updateUI();
};

const backdropClickHAndler = () => {
    toggleMovieModal();
};


startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHAndler);
cancelAddMovieButton.addEventListener('click', cancelMovieButtonHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
