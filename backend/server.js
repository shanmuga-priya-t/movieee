const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // Frontend backend-ah access panna ithu thevai

const API_KEY = "61b521467892dfc8c93263d22766d16d";

// Movies data-vah TMDB API-la irundhu yeduthu tharum
app.get('/api/movies', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Backend API Fetch failed" });
    }
});

// Port 5000-la backend run aagum
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
