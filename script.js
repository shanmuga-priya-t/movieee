// Unga AWS Backend URL (Port 5000)
const BASE_URL = "http://65.2.126.81:5000/api";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const moviesEl = document.getElementById("movies");
const searchInput = document.getElementById("search");

// Fetch movies from your own Backend
async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    // Backend returns data.results from TMDB
    if (data.results) {
        showMovies(data.results);
    } else {
        showMovies(data);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    moviesEl.innerHTML = "<h3>Error loading movies from backend.</h3>";
  }
}

// Display movies
function showMovies(movies) {
  moviesEl.innerHTML = "";

  if (!movies || movies.length === 0) {
    moviesEl.innerHTML = "<h3>No movies found.</h3>";
    return;
  }

  movies.forEach(movie => {
    const { title, poster_path, vote_average } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="${poster_path ? IMG_URL + poster_path : 'https://via.placeholder.com/500x750?text=No+Image'}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
    `;

    moviesEl.appendChild(movieEl);
  });
}

// Rating color fix
function getColor(vote) {
    if (vote >= 8) return 'green';
    else if (vote >= 5) return 'orange';
    else return 'red';
}

// Load movies initially using your Backend
getMovies(`${BASE_URL}/movies`);

// Search functionality (Note: Backend-la search handle panna setup pannanum, 
// for now idhu popular movies-ah refresh pannum)
searchInput.addEventListener("keyup", (e) => {
  const query = e.target.value.trim();
  if (query === "") {
    getMovies(`${BASE_URL}/movies`);
  }
});
