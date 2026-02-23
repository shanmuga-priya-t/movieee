// Unga AWS IP address correctly irukkunu check pannikonga
const BASE_URL = "http://65.2.126.81:5000/api/movies";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const movieContainer = document.getElementById("movie-container");
const movieTitleInput = document.getElementById("movieTitle");

// 1. Backend-la irundhu movies fetch panna
async function getMovies() {
    try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        
        // TMDB results check: results array-va irundha adhai edukum, illana direct data-va edukum
        if (data.results) {
            showMovies(data.results);
        } else {
            showMovies(data);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        movieContainer.innerHTML = "<h3>Backend connect aagala nanba!</h3>";
    }
}

// 2. Movies-ah screen-la kaatta
function showMovies(movies) {
    movieContainer.innerHTML = "";
    
    if (!movies || movies.length === 0) {
        movieContainer.innerHTML = "<h3>No movies found.</h3>";
        return;
    }

    movies.forEach(movie => {
        const { id, title, vote_average, poster_path, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img src="${poster_path ? IMG_URL + poster_path : 'https://via.placeholder.com/500x750?text=No+Image'}" 
                 alt="${title}" 
                 onclick="alert('Description: ${overview ? overview.replace(/'/g, "\\'") : "No description available"}')">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="vote">${vote_average}</span>
            </div>
            <button class="delete-btn" onclick="deleteMovie(${id})">Delete</button>
        `;
        movieContainer.appendChild(movieEl);
    });
}

// 3. Pudhu movie add panna
async function addMovie() {
    const title = movieTitleInput.value;
    if (!title) return alert("Movie name-ah type pannunga!");

    try {
        await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title })
        });

        movieTitleInput.value = "";
        getMovies(); // Refresh list
    } catch (err) {
        alert("Movie add panna mudiyele!");
    }
}

// 4. Movie-ah delete panna
async function deleteMovie(id) {
    if (confirm("Indha movie-ah delete pannatuma?")) {
        try {
            await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
            getMovies(); // Refresh list
        } catch (err) {
            alert("Delete panna mudiyele!");
        }
    }
}

// Page load aagumbodu automatic-ah movies fetch panna
getMovies();
