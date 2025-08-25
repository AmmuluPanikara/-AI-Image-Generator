const apiKey = "JRJH3CCTs82yuWFg7wWqNt5h0_z94537G8_Pf_WyNgw"; // ✅ Your Unsplash Key

async function getImages() {
  const query = document.getElementById("queryInput").value;
  const count = document.getElementById("countSelect").value;
  const imageContainer = document.getElementById("imageContainer");

  if (query === "") {
    alert("⚠️ Please enter a keyword!");
    return;
  }

  imageContainer.innerHTML = "<p>⏳ Loading images...</p>";

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&client_id=${apiKey}`
    );

    if (!response.ok) throw new Error("Failed to fetch images!");

    const data = await response.json();

    if (data.results.length === 0) {
      imageContainer.innerHTML = "<p>No images found. Try another keyword!</p>";
      return;
    }

    imageContainer.innerHTML = data.results.map(img => `
      <div class="image-card">
        <img src="${img.urls.regular}" alt="${query}">
        <a href="${img.links.download}" target="_blank" class="download-btn">⬇ Download</a>
      </div>
    `).join("");

  } catch (error) {
    imageContainer.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

// 🌙 Dark/Light Mode Toggle
function toggleMode() {
  document.body.classList.toggle("dark");
}
