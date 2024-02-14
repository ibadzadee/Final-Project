let mouseIcon = document.querySelector("#toBottom");
mouseIcon.addEventListener("click", () => {
    window.scrollTo({
        top: 800,
        behavior: 'smooth',
    });
});



// ------------- Fetch Data -------------
const url = `http://localhost:3000/users/`;

let contactSection = document.querySelector("#contactSection");
let restoranName = document.querySelector("#restoranName");
let hotDishes = document.querySelector("#hotDishes");
let coldDishes = document.querySelector("#coldDishes");
let salads = document.querySelector("#salads");
let desserts = document.querySelector("#desserts");
let beverages = document.querySelector("#beverages");
let id = new URLSearchParams(window.location.search).get("id");
console.log(id);
function createMenuItem(item, container) {
  container.innerHTML += `
    <div class="menu-items">
      <div class="image">
        <img src="${item.images}" alt="" />
      </div>
      <div class="right">
        <div class="text">
          <h5 class="name">${item.name}</h5>
          <p class="about">${item.about}</p>
        </div>
        <div class="cost">
          <h4 class="costItem">$${item.cost}</h4>
        </div>
      </div>
    </div>
  `;
}

fetch(url + id)
  .then((response) => response.json())
  .then((data) => {
    // Banner Image:
    let bannerSection = document.querySelector("#banner.restorans");
    bannerSection.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)) , url(${data.restaurant.backgroundPhoto})`;
    bannerSection.style.backgroundSize = `cover`;
    bannerSection.style.backgroundRepeat = `no-repeat`;
    bannerSection.style.backgroundPosition = `center`;

    restoranName.innerHTML = data.restaurant.name;
    contactSection.innerHTML = `
      <div class="contact-item">
        <h5>Location:</h5>
        <p>${data.restaurant.location}</p>
      </div>

      <div class="contact-item">
        <h5>Work Time:</h5>
        <div class="worktime">
          <p>Monday-Saturday: ${data.restaurant.workTime[0]} AM - ${data.restaurant.workTime[1]}  PM,</p>
          <p>Sunday: ${data.restaurant.workTime[2]}  PM- ${data.restaurant.workTime[3]}  PM</p>
        </div>
      </div>

      <div class="contact-item">
        <h5>Phone Number:</h5>
        <p>${data.restaurant.phone}</p>
      </div>
    `;

    // Menu Items
    ['hotDishes', 'coldDishes', 'salads', 'desserts', 'beverages'].forEach((menuType) => {
      data.restaurant.menu[menuType].forEach((element) => {
        createMenuItem(element, document.getElementById(menuType));
      });
    });
  });


// 

// <!---------------- Image Carousel ---------------->

let arr = [];
fetch(url + id)
  .then((res) => res.json())
  .then((data) => {
    arr = data.restaurant.photos;
    console.log(arr);
    printData();
    $(document).ready(function () {
      $(".owl-carousel").owlCarousel({
        margin: 10,
        dots: true,
        loop: true,
        responsive: {
          0: {
            items: 1,
          },
          800: {
            items: 2,
          },
          1000: {
            items: 3,
          },
        },
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 3000,
      });
    });
  });

let carouselContainer = document.querySelector(".owl-carousel");

const printData = () => {
  arr.forEach((element) => {
    carouselContainer.innerHTML += `
      <dv class="mycard">
        <img src="${element}" alt = "image" />
    </dv>
      `;
  });
};
