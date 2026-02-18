const API_KEY = "61b521467892dfc8c93263d22766d16d";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const moviesEl = document.getElementById("movies");
const searchInput = document.getElementById("search");

// Fetch movies
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

// Display movies
function showMovies(movies) {
  moviesEl.innerHTML = "";

  movies.forEach(movie => {
    const { title, poster_path, vote_average } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="${poster_path ? IMG_URL + poster_path : ''}" alt="${title}">
      <h3>${title}</h3>
      <span>${vote_average}</span>
    `;

    moviesEl.appendChild(movieEl);
  });
}

// Load popular movies initially
getMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

// Search movies
searchInput.addEventListener("keyup", (e) => {
  const query = e.target.value.trim();

  if (query) {
    getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  } else {
    getMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  }
});