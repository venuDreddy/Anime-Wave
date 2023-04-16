let searchBar = document.querySelector("#name");
let form = document.querySelector("#form");
let btn = document.querySelector(".btn");
let imageContainer = document.querySelector(".images");
let searchImageContainer = document.querySelector(".search-images");
let details = document.querySelector(".details");
let randomBtn = document.querySelector(".random");
let animeName;
let url;
form.addEventListener("submit", function (e) {
  e.preventDefault();
});
btn.addEventListener("click", function () {
  animeName = searchBar.value;
  url = `https://api.jikan.moe/v4/anime?q=${animeName}`;
  getName();
});
randomBtn.addEventListener("click", function (e) {
  getRandom();
});
async function getName() {
  let response = await fetch(url);
  let info = await response.json();
  imageContainer.innerHTML = "";
  searchImageContainer.innerHTML = "";
  let count = 0;
  info.data.forEach(function (data) {
    if (
      data.title.toLowerCase().includes(`${animeName.toLowerCase()}`) ||
      (data.title_english || "")
        .toLowerCase()
        .includes(`${animeName.toLowerCase()}`)
    ) {
      count = 1;
      let info = document.createElement("article");
      info.classList.add("info");
      info.innerHTML = `<div class="img-info">
        <img src="${data.images.jpg.image_url}" alt="" />
        <article>
          <p><b>Title:</b>${data.title_english || data.title}</p>
          <p><b>Episodes:</b>${data.episodes || "Not Available"}</p>
          <p><b>Status:</b>${data.status || "Not Available"}</p>
          <p><b>Rating:</b>${data.rating || "Not Available"}</p>
        </article>
      </div>
      <div class="synopsis">
        <p><b>Synopsis:</b>${data.synopsis || "Not Available"}</p>
      </div>`;
      searchImageContainer.appendChild(info);
    }
  });
  if (count === 0) {
    let notFound = document.createElement("p");
    notFound.innerHTML = "There is no matching anime.";
    notFound.style.color = "red";
    searchImageContainer.appendChild(notFound);
  }
}
async function getVideo() {
  let response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  let info = await response.json();
  console.log(info);
}
async function getTopAnime() {
  let response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=10`);
  let info = await response.json();
  for (i = 0; i < 10; i++) {
    let article = document.createElement("article");
    article.innerHTML = `<img src="${
      info.data[i].images.jpg.image_url
    }" alt="" />
        <p><b>${info.data[i].title_english || info.data[i].title}</b></p>`;
    article.classList.add("top-img-article");
    imageContainer.appendChild(article);
  }
}
getTopAnime();

async function getRandom() {
  let response = await fetch(`https://api.jikan.moe/v4/random/anime`);
  let info = await response.json();
  imageContainer.innerHTML = "";
  searchImageContainer.innerHTML = "";
  let randomInfo = document.createElement("article");
  randomInfo.classList.add("info");
  randomInfo.innerHTML = `<div class="img-info">
        <img src="${info.data.images.jpg.image_url}" alt="" />
        <article>
          <p><b>Title:</b>${info.data.title_english || info.data.title}</p>
          <p><b>Episodes:</b>${info.data.episodes || "Not Available"}</p>
          <p><b>Status:</b>${info.data.status || "Not Available"}</p>
          <p><b>Rating:</b>${info.data.rating || "Not Available"}</p>
        </article>
      </div>
      <div class="synopsis">
        <p><b>Synopsis:</b>${info.data.synopsis || "Not Available"}</p>
      </div>`;
  searchImageContainer.appendChild(randomInfo);
}
