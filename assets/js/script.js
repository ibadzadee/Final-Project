let nav = document.querySelector("nav");
window.addEventListener("scroll" , ()=>{
    if (window.scrollY > 50) {
        nav.style.position = "sticky"
        nav.style.background = "#0D0C28";
        // nav.style.opacity = "0.8";
        nav.style.padding = "30px 0px";
      } 
      else {
        nav.style.position = "absolute"
        nav.style.background = "";
        nav.style.opacity = "";
        nav.style.padding = "";
      }
})