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

// menu.addEventListener("click", ()=>{
//   menu.classList.
// })

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

// <!-------------- See More Btn ----------------->
const seeMoreBtn = document.querySelector("#seeMoreBtn");
seeMoreBtn.addEventListener("click", () => {
  window.location = "./ourRestorans.html";
});

// <!-------------- Fetch Data----------------->

const url = `https://chalk-foggy-promise.glitch.me/users`;
const section = document.querySelector(".bottomFlip");
console.log(section);
const limit = 3;

fetch(`https://chalk-foggy-promise.glitch.me/users?_limit=${limit}`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element, index) => {
      console.log(element);
      section.innerHTML += `
      <div class="column">
      <div class="flippingCard">
      <div id="card1" class="card">
        <figure class="front card-inner">
          <div class="img">
            <img src="${element.restaurant.backgroundPhoto}" alt="" />
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
              <p>Sunday: ${element.restaurant.workTime[2]} PM- ${element.restaurant.workTime[3]} PM</p>
            </div>
            </div>
            <div class="p p2">
              <i class="bi bi-telephone"></i>
              <p>${element.restaurant.phone}</p>
            </div>
            <button class="button">Get Barcode</button>
          </div>
        </figure>

        <figure class="back card-inner">
          <div class="barcode" id=restaurant1>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://./restorans.html?id=${element.id}" alt="barcode" class ="barcodes" />
          </div>
        </figure>
      </div>
    </div>
    <a class="button button-register" href="./restorans.html?id=${element.id}" target = _blank>Visit Restaurant</a>    
    </div>
    `;
      let cards = document.querySelectorAll(".card");
      cards.forEach((element) => {
        element.addEventListener("click", (e) => {
          e.currentTarget.classList.toggle("flipped");
        });
      });
      // let barcodes = document.querySelectorAll(".barcodes");
      // barcodes.forEach(item=>{
      //   item.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://./restorans.html?id=${element.id}/`;
      // });
      // let links = document.querySelectorAll('.button');
      // links.forEach(item=>{
      //   item.href =`./restorans.html?id=${element.id}/`
      // })
    });
  });

// var qrcode = new qrcode("restaurant1", {
//   text: "http://127.0.0.1:5500/restorans.html?id=1",
//   width: 128,
//   height: 128,
//   colorDark: "#000000",
//   colorLight: "#ffffff",
//   correctLevel: QRCode.CorrectLevel.H,
// });




// 
// 
// 
//             <a class="button" href="./restorans.html?id=${element.id}" target = _blank>Visit Restaurant</a>
