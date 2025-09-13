let toggleBtn = document.getElementById ("Btn");
let slider = document.getElementById("slider");
let toggleIcon = document.querySelector(".toggle");

slider.classList.add("closed-menu");

toggleBtn.addEventListener("click", function () {
    slider.classList.toggle("open-menu");

    if (slider.classList.contains("open-menu")) {
        toggleIcon.classList.remove("fa-align-justify");
        toggleIcon.classList.add("fa-times");
    } else {
        toggleIcon.classList.remove("fa-times");
        toggleIcon.classList.add("fa-align-justify");
    }
});

let allMovies = [];

async function getMovies(url) {
    let response = await fetch(url);
    let data = await response.json();
    allMovies = data.results;
    displayMovies(allMovies);
}

function displayMovies(movies) {
    let cartona = "";
    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i];
        cartona += `
            <div class="col-md-6 col-lg-4 my-3 shadow">
                <div class="movie shadow ">
                    <div class="post">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path || ""}" 
                             class="img-fluid rounded"/>
                        <div class="layer">
                            <div class="info p-0">
                                <h2>${movie.title}</h2>
                                <p>${movie.overview}</p>
                                <p>Rate: ${movie.vote_average}</p>
                                <p>${movie.release_date || ""}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById("rowData").innerHTML = cartona;
}

getMovies("https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44");

document.querySelector(".item1").addEventListener("click", function () {
    getMovies("https://api.themoviedb.org/3/movie/now_playing?api_key=068e641eda43a4d14ab43a28fed5d650");
});

document.querySelector(".item2").addEventListener("click", function () {
    getMovies("https://api.themoviedb.org/3/movie/popular?api_key=068e641eda43a4d14ab43a28fed5d650");
});

document.querySelector(".item3").addEventListener("click", function () {
    getMovies("https://api.themoviedb.org/3/movie/top_rated?api_key=068e641eda43a4d14ab43a28fed5d650");
});

document.querySelector(".item4").addEventListener("click", function () {
    getMovies("https://api.themoviedb.org/3/trending/all/day?api_key=068e641eda43a4d14ab43a28fed5d650");
});

document.querySelector(".item5").addEventListener("click", function () {
    getMovies("https://api.themoviedb.org/3/movie/upcoming?api_key=068e641eda43a4d14ab43a28fed5d650");
});

let searchInput = document.getElementById("search");
searchInput.onkeyup = function () {
    let term = searchInput.value.toLowerCase();
    let filteredMovies = [];

    for (let i = 0; i < allMovies.length; i++) {
        if (
            allMovies[i].original_title &&
            allMovies[i].original_title.toLowerCase().includes(term)
        ) {
            filteredMovies.push(allMovies[i]);
        }
    }

    displayMovies(filteredMovies);
};

let getMovieWord = document.getElementById("getMovieWord");
getMovieWord.onkeyup = function () {
    let word = getMovieWord.value.trim();
    if (word !== "") {
        getMovies(
            "https://api.themoviedb.org/3/search/movie?query=" +
            word +
            "&api_key=068e641eda43a4d14ab43a28fed5d650&language=en-US&include_adult=false"
        );
    }
};
