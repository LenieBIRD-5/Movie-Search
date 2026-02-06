const API_KEY = '5f648128';

const movieListEl = document.querySelector('.movie-list');
const searchInputEl = document.querySelector('.input__box input');
const searchButtonEl = document.querySelector('.input__box .button');
const filterEl = document.getElementById('filter');
const searchSectionEl = document.getElementById('search');

function renderMovies(movies) {
  if (!Array.isArray(movies) || movies.length === 0) {
    movieListEl.innerHTML = `<p>No results found.</p>`;
    return;
  }
  movieListEl.innerHTML = movies.map(movieHTML).join('');
}

function movieHTML(movie) {
  const posterUrl = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : './assets/placeholder.svg';
  const title = movie.Title;
  const year = movie.Year;
  return `
    <div class="movie">
      <div class="movie-card">
        <div class="movie-card__container">
          <a href="${posterUrl}" target="_blank" aria-label="Open poster in new tab">
            <img class="movie-card__poster" src="${posterUrl}" alt="${title} poster" />
          </a>
          <h3>${title}</h3>
          <p><b>Year:</b> ${year}</p>
        </div>
      </div>
    </div>
  `;
}

async function searchMovies(term) {
  if (!API_KEY || API_KEY === 'YOUR_OMDB_API_KEY') {
    renderMovies([]);
    console.warn('OMDb API key missing. Set API_KEY in movies.js');
    return;
  }
  const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(term)}&page=1&apikey=${API_KEY}`);
  const data = await res.json();
  if (data.Response === 'False') {
    console.error(data.Error || 'Search failed');
    renderMovies([]);
    return;
  }
  let results = data.Search || [];
  const sortBy = filterEl && filterEl.value;
  if (sortBy === 'tile' || sortBy === 'title') {
    results = results.slice().sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortBy === 'year') {
    results = results.slice().sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  }
  renderMovies(results);
}

function main() {
  if (searchSectionEl) {
    searchSectionEl.classList.add('hidden');
  }
  if (searchButtonEl) {
    searchButtonEl.addEventListener('click', () => {
      const term = (searchInputEl && searchInputEl.value) || '';
      if (term.trim()) {
        if (searchSectionEl) searchSectionEl.classList.remove('hidden');
        searchMovies(term.trim());
      }
    });
  }
  if (searchInputEl) {
    searchInputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const term = searchInputEl.value || '';
        if (term.trim()) {
          if (searchSectionEl) searchSectionEl.classList.remove('hidden');
          searchMovies(term.trim());
        }
      }
    });
  }
  if (filterEl) {
    filterEl.addEventListener('change', () => {
      const term = (searchInputEl && searchInputEl.value) || '';
      if (term.trim()) {
        searchMovies(term.trim());
      }
    });
  }
}

main();