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

// Chuyển ngày thành số để sắp xếp (1 -> 7)
function getDayValue(dayStr) {
  if (!dayStr) return 99;
  const normalized = String(dayStr).toLowerCase().trim();
  if (normalized.includes("hai") || normalized === "t2") return 1;
  if (normalized.includes("ba") || normalized === "t3") return 2;
  if (normalized.includes("tư") || normalized === "t4") return 3;
  if (normalized.includes("năm") || normalized === "t5") return 4;
  if (normalized.includes("sáu") || normalized === "t6") return 5;
  if (normalized.includes("bảy") || normalized === "t7") return 6;
  if (normalized.includes("chủ nhật") || normalized === "cn") return 7;
  return 99;
}

// Chuyển Giờ ra số Phút để sắp xếp
function getTimeMinutes(timeStr) {
  if (!timeStr) return 1440; // Nếu không có giờ, đẩy xuống cuối ngày
  const parts = timeStr.split(":");
  if (parts.length >= 2) {
    const h = parseInt(parts[0], 10) || 0;
    const m = parseInt(parts[1], 10) || 0;
    return h * 60 + m;
  }
  return 1440;
}

document.addEventListener("DOMContentLoaded", async () => {
  if (localStorage.getItem("anime_gh_token")) {
    const adminBtn = document.createElement("a");
    adminBtn.href = "admin.html";
    adminBtn.className = "admin-float-btn";
    adminBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    document.body.appendChild(adminBtn);
  }

  try {
    const res = await fetch("data.json?t=" + new Date().getTime());
    if (!res.ok) throw new Error("Network response was not ok");
    const animes = await res.json();

    // Thuật toán sắp xếp: Ngày trước -> Giờ sau
    animes.sort((a, b) => {
      const dayDiff = getDayValue(a.rawDay) - getDayValue(b.rawDay);
      if (dayDiff !== 0) return dayDiff;
      return getTimeMinutes(a.rawTime) - getTimeMinutes(b.rawTime);
    });

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

    const visual = document.createElement("div");
    visual.className = "anime-visual";

    const img = document.createElement("img");
    img.src = anime.poster;
    img.alt = anime.title.replace(/<[^>]*>?/gm, "");
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

    // --- LOGIC HIỂN THỊ "NGÀY - GIỜ" LUÔN LUÔN HOẠT ĐỘNG ---
    let displayRaw = anime.rawDay;
    if (anime.rawTime) {
      const parts = anime.rawTime.split(":");
      if (parts.length >= 2) {
        const date = new Date();
        date.setHours(parseInt(parts[0], 10), parseInt(parts[1], 10), 0, 0);
        // Tự động ra định dạng 22:30 hoặc 10:30 PM tùy máy người dùng
        const timeString = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        displayRaw = `${anime.rawDay} - ${timeString}`;
      }
    }

    const info = document.createElement("div");
    info.className = "anime-info";
    info.innerHTML = `
      <h2>Raw: ${displayRaw}</h2>
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
