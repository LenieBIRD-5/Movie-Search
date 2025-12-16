// START API: https://www.omdbapi.com/?i=tt3896198&apikey=5f648128
// MIDDLE API: https://www.omdbapi.com/?s=guardians&page=1&apikey=5f648128
// FINAL API: https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=5f648128

async function main() {
    const movies = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=5f648128");
    const moviesData = await movies.json();
    console.log(
    moviesData
    .map(
        (movie) => `<div class="movie-card">
        <div class="movie-card__container">
        <h3>Movie Title</h4>
            <p><b>Poster:</b> <a href="https://website.website" target="_blank">website.website</a></p>
            <p><b>Year:</b> Movie Year</p>
        </div>
    </div>`
        )
            .join("")
    ); 
}

main();
