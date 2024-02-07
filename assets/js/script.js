let nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.style.position = "sticky";
    nav.style.background = "#0D0C28";
    nav.style.padding = "8px 0px";
  } else {
    nav.style.position = "absolute";
    nav.style.background = "";
    nav.style.opacity = "";
    nav.style.padding = "";
  }
});

const menu = document.querySelector(".menu");
const menuIcon = document.querySelector(".list");
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// <!--------------From end to top btn----------------->
let topBtn = document.querySelector("#toTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.style.scale = "1";
  } else {
    topBtn.style.scale = "";
  }
});

topBtn.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});