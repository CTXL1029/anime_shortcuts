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

function copyText_1() {
  const name =
    "Yêu Nhau Đến Tận Ngày Cậu Biến Mất | Kimi ga Shinu made Koi wo Shitai";
  navigator.clipboard.writeText(name).then(() => showToast(name));
}

function download1() {
  window.open(
    "https://nyaa.si/?f=0&c=0_0&q=%5BErai-raws%5D+Kimi+ga+Shinu+made+Koi+wo+Shitai+1080p+CR+WEB-DL",
    "_blank",
  );
}

function copyText_2() {
  const name = "Candy Caries | Candy Caries";
  navigator.clipboard.writeText(name).then(() => showToast(name));
}

function download2() {
  window.open(
    "https://www.youtube.com/playlist?list=PLdM751AKK4aO1NT4ECieGCsB5XPxIxbv5",
    "_blank",
  );
}

function copyText_3() {
  const name = "Vẽ Cái Này Rồi Chết Đi | Kore Kaite Shine";
  navigator.clipboard.writeText(name).then(() => showToast(name));
}

function download3() {
  window.open(
    "https://nyaa.si/?f=0&c=0_0&q=%5BToonsHub%5D+Draw+This+Then+Die+1080p+NF",
    "_blank",
  );
  window.open(
    "https://nyaa.si/?f=0&c=0_0&q=%5BSubsPlease%5D+Kore+Kaite+Shine+1080p",
    "_blank",
  );
}

function copyText_4() {
  const name =
    "Ác Nữ Nửa Vời | Futsutsuka na Akujo dewa Gozaimasu ga: Suuguu Chouso Torikae Den";
  navigator.clipboard.writeText(name).then(() => showToast(name));
}

function download4() {
  window.open(
    "https://nyaa.si/?f=0&c=0_0&q=%5BErai-raws%5D+Futsutsuka+na+Akujo+dewa+Gozaimasu+ga+1080p+CR+WEB-DL",
    "_blank",
  );
  window.open(
    "https://nyaa.si/?f=0&c=0_0&q=%5BToonsHub%5D+Though+I+Am+an+Inept+Villainess+1080p+NF+WEB-DL",
    "_blank",
  );
}

function copyText_5() {
  const name =
    "Cậu Và Tớ Là Hai Thái Cực Đối Lập Mùa 2 | Seihantai na Kimi to Boku 2nd Season";
  navigator.clipboard.writeText(name).then(() => showToast(name));
}

function download5() {
  window.open(
    "https://fptplay.vn/xem-video/cau-va-to-la-hai-thai-cuc-doi-lap-mua-2-you-and-i-are-polar-opposites-season-2-6a487c43205e85d46ddbce66.html",
    "_blank",
  );
  window.open(
    "https://nyaa.si/?q=%5BErai-raws%5D+Seihantai+na+Kimi+to+Boku+2nd+Season+CR+1080p&f=0&c=0_0",
    "_blank",
  );
}

function copyText_6() {
  const name =
    "Hiên Sau Siêu Thị Muộn Phiền Bay Đi | Super no Ura de Yani Suu Futari";
  navigator.clipboard.writeText(name).then(() => showToast(name));
}

function download6() {
  window.open(
    "https://nyaa.si/?f=0&c=0_0&q=Smoking+Behind+the+Supermarket+With+You+1080p+NF+WEB-DL+MULTi+AAC2.0+H+264-VARYG",
    "_blank",
  );
  window.open(
    "https://nyaa.si/?f=0&c=0_0&q=%5BErai-raws%5D+Super+no+Ura+de+Yani+Suu+Futari+1080p+CR+WEB-DL+AVC+AAC",
    "_blank",
  );
}
