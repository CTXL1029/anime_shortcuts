let toastTimeout;
function showToast(text) {
  const toast = document.getElementById("toast");
  toast.innerText = "Đã sao chép:\n" + text;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", async () => {
  // Kiểm tra nếu có mã token GitHub thì hiện nút Admin (cái bút)
  if (localStorage.getItem("gh_token")) {
    const adminBtn = document.createElement("a");
    adminBtn.href = "admin.html";
    adminBtn.className = "admin-float-btn";
    adminBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    document.body.appendChild(adminBtn);
  }

  // Lấy dữ liệu anime (thêm timestamp để tránh bị trình duyệt lưu cache)
  try {
    const res = await fetch("data.json?t=" + new Date().getTime());
    if (!res.ok) throw new Error("Network response was not ok");
    const animes = await res.json();
    renderAnimes(animes);
  } catch (error) {
    console.error("Lỗi tải danh sách anime:", error);
  }
});

function renderAnimes(animes) {
  const container = document.getElementById("animeListContainer");
  container.innerHTML = "";

  animes.forEach((anime) => {
    const article = document.createElement("article");
    article.className = "anime-item";

    // --- Cột trái: Ảnh và Tên ---
    const visual = document.createElement("div");
    visual.className = "anime-visual";

    const img = document.createElement("img");
    img.src = anime.poster;
    img.alt = anime.title.replace(/<[^>]*>?/gm, ""); // Xóa tag HTML đi lấy alt
    img.onclick = () => {
      if (anime.watchLinks && anime.watchLinks.length > 0) {
        anime.watchLinks.forEach((link) => {
          if (link && link.trim() !== "") window.open(link, "_blank");
        });
      }
    };

    const title = document.createElement("p");
    title.className = "anime-title";
    title.innerHTML = anime.title;
    title.onclick = () => {
      navigator.clipboard
        .writeText(anime.copyText)
        .then(() => showToast(anime.copyText));
    };

    visual.appendChild(img);
    visual.appendChild(title);

    // --- Cột phải: Thông tin và Nút ---
    const info = document.createElement("div");
    info.className = "anime-info";
    info.innerHTML = `
      <h2>Raw: ${anime.rawDay}</h2>
      <div class="button-group">
        <a href="${anime.malLink}" target="_blank" rel="noopener noreferrer">
          <img src="assets/MAL-Btn.webp" alt="MyAnimeList" />
        </a>
        <a href="${anime.asLink}" target="_blank" rel="noopener noreferrer">
          <img src="assets/AS-Btn.webp" alt="AnimeSchedule" />
        </a>
      </div>
    `;

    article.appendChild(visual);
    article.appendChild(info);
    container.appendChild(article);
  });
}
