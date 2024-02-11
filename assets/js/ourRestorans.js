// $(function () {
//   $(".card").click(function (event) {
//     $(event.currentTarget).toggleClass("flipped");
//   });
// });


// ---nav---
let nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.style.background = "#0D0C28";
    nav.style.padding = "8px 0px";
  } else {
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

// <!-------------- Fetch Data----------------->

const url = `http://localhost:3000/users`;
const section = document.querySelector(".bottomFlip");
console.log(section);
// const limit = 3;
fetch(`http://localhost:3000/users`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      console.log(element.name);
      section.innerHTML += `
      <div class="flippingCard">
      <div id="card1" class="card">
        <figure class="front card-inner">
          <div class="img">
            <img src="${element.restaurant.photos[0]}" alt="" />
          </div>
          <h4 id="name">${element.restaurant.name}</h4>
         <div class="info">
            <div class="p">
              <i class="bi bi-geo-alt"></i>
              <p>${element.restaurant.location}</p>
            </div>
            <div class="p">
              <i class="bi bi-calendar-week"></i>
              <div class="worktime">
              <p>Monday-Saturday: ${element.restaurant.workTime[0]} AM - ${element.restaurant.workTime[1]} PM,</p>
              <p>Sunday: 12:00 PM- 9:00 PM</p>
            </div>            </div>
            <div class="p p2">
              <i class="bi bi-telephone"></i>
              <p>${element.restaurant.phone}</p>
            </div>
            <button class="button">Visit Restaurant</button>
          </div>
        </figure>

        <figure class="back card-inner">
          <div class="barcode">
            <img src="./assets/img/barkod.png" alt="" />
          </div>
        </figure>
      </div>
    </div>
    `;
    });
  });
