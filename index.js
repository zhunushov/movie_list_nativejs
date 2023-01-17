const searchInp = document.getElementById("search-inp");
const container = document.querySelector(".container");
const empty = document.querySelector(".empty");

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const getMovies = (term) => {
  const title = term ? term : "All";
  container.innerHTML = null;

  fetch(`${API_URL}&s=${title}`)
    .then((json) => json.json())
    .then((data) => {
      const { Search = [] } = data;
      if (Search.length) {
        Search.forEach((movie) => render(movie));
      } else {
        container.innerHTML = `
           <div class="empty">
             <h2>No movies found</h2>
           </div>
        `;
      }
    });
};
getMovies();

searchInp.addEventListener("input", (e) => {
  console.log(e);
  getMovies(e.target.value.trim());
});

function render(movie) {
  const { Year, Poster, Type, Title } = movie;
  const imgUrl = Poster !== "N/A" ? Poster : "https://via.placeholder.com/400";
  container.innerHTML += `
    <div class="movie">
        <div><p>${Year}</p></div>
        <div><img src=${imgUrl} alt=${Title} /></div>
        <div><span>${Type}</span><h3>${Title}</h3></div>
    </div>       
    `;
}
