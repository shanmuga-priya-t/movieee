const BASE_URL = "";
const IMG_URL = "";
const movieContainer = document.getElementById("movie-container");

// 1. Backend-la irundhu movies fetch panna
async function getMovies() {
try {
const res = await fetch(BASE_URL);
const data = await res.json();
// Data 'results' array-kulla irundha adhai edukum, illana direct array-va edukum
showMovies(data.results ? data.results : data);
} catch (error) {
console.error("Fetch error:", error);
movieContainer.innerHTML = "<h3>Backend Connect Aagala!</h3>";
}
}

// 2. Movies-ah screen-la kaatta
function showMovies(movies) {
movieContainer.innerHTML = "";
movies.forEach(movie => {
const movieEl = document.createElement("div");
movieEl.classList.add("movie");
movieEl.innerHTML = <img src="${movie.poster_path ? IMG_URL + movie.poster_path : '[https://via.placeholder.com/500x750?text=No+Image](https://via.placeholder.com/500x750?text=No+Image)'}"  onclick="alert('Description: ${movie.overview ? movie.overview.replace(/'/g, "\\'") : "No description available"}')"> <div class="movie-info"> <h3>${movie.title}</h3> <span>${movie.vote_average}</span> </div> <button class="delete-btn" onclick="deleteMovie(${movie.id})">Delete</button>;
movieContainer.appendChild(movieEl);
});
}

// 3. Movie Add panna
async function addMovie() {
const title = document.getElementById("movieTitle").value;
if (!title) return alert("Movie title type pannunga!");
await fetch(BASE_URL, {
method: 'POST',
headers: {'Content-Type': 'application/json'},
body: JSON.stringify({ title })
});
document.getElementById("movieTitle").value = "";
getMovies();
}

// 4. Movie Delete panna
async function deleteMovie(id) {
await fetch(${BASE_URL}/${id}, { method: 'DELETE' });
getMovies();
}

getMovies();
