document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("anime-container");
  const spinner = document.getElementById("loading-spinner");

  // Hide the spinner once loaded
  function hideSpinner() {
    if (spinner) spinner.style.display = "none";
  }

  // Render anime cards
  function renderAnime(animeList) {
    animeList.forEach(anime => {
      const card = document.createElement("div");
      card.className = "anime-card";
      card.innerHTML = `
        <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>Score: ${anime.score ?? "N/A"}</p>
      `;
      container.appendChild(card);
    });
  }

  // Fetch top airing anime from Jikan API
  try {
    const response = await axios.get("https://api.jikan.moe/v4/top/anime?filter=airing&limit=8");
    const animeList = response.data.data;

    hideSpinner();
    renderAnime(animeList);
  } catch (error) {
    hideSpinner();
    container.innerHTML = "<p style='color: red;'>Failed to load anime data. Please try again later.</p>";
    console.error("Error fetching anime:", error);
  }
});
