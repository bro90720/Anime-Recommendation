document.addEventListener("DOMContentLoaded", () => {
  const trendingGrid = document.getElementById("trending-grid");
  const spinner = document.getElementById("trending-spinner");

  async function fetchAnime() {
    try {
      spinner.style.display = "block";
      const res = await axios.get("https://api.jikan.moe/v4/top/anime?limit=8");
      const animeList = res.data.data;

      trendingGrid.innerHTML = "";
      animeList.forEach(anime => {
        const card = document.createElement("div");
        card.className = "anime-card";
        card.innerHTML = `
          <div class="card-image">
            <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
            <div class="card-badge">${anime.score ?? "N/A"}</div>
          </div>
          <div class="card-content">
            <h3>${anime.title}</h3>
            <div class="genres">
              ${anime.genres.slice(0, 2).map(g => `<span class="genre-tag">${g.name}</span>`).join("")}
            </div>
            <div class="rating"><i class="fas fa-star"></i> ${anime.score ?? "N/A"}</div>
          </div>
        `;
        trendingGrid.appendChild(card);
      });
    } catch (error) {
      trendingGrid.innerHTML = "<p style='color:red;'>Failed to load anime.</p>";
      console.error(error);
    } finally {
      spinner.style.display = "none";
    }
  }

  fetchAnime();
});
