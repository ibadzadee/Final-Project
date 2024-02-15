let logoffEl = document.querySelector("#logoff");
let infoEl = document.querySelector("#info");
let logoutBtn = document.querySelector(".logout");
let photos = [];
let hot = [];
let cold = [];
let salad = [];
let desserts = [];
let beverages = [];
let inputList = [];

let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).name
  : null;

function uuidv4() {
  return "*xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx*".replace(
    /[xy]/g,
    function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "*x*" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
}

if (user) {
  infoEl.innerHTML = `<h5> Welcome, ${user}! </h5>`;
  infoEl.style.display = "flex";
  logoffEl.style.display = "none";
} else {
  setTimeout(() => {
    window.location = "./register.html";
  }, 2000);
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location = `./register.html`;
});


// ------------------------ Add Table ------------------------

document.querySelectorAll(".addTab").forEach((button) => {
  // console.log(button);
  button.addEventListener("click", (e) => {
    let key = e.target.dataset.key;
    let template = {
      images: "",
      name: "",
      about: "",
      cost: 0,
    };
    switch (Number(key)) {
      case 1:
        hot.push({ ...template });
        break;
      case 2:
        cold.push({ ...template });
        break;
      case 3:
        salad.push({ ...template });
        break;
      case 4:
        desserts.push({ ...template });
        break;
      case 5:
        beverages.push({ ...template });
        break;
      default:
        console.log("Mig");
        break;
    }

    renderTables();

  });
});



// -------------- Nav codes --------------

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

// ---------------- Fetch Data -----------------
const url = `http://localhost:3000/users/`;
let id = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).id
  : null;

// ---------------- Personal Information: ----------------
const personalForm = document.querySelector(".personalForm");
let namePersonal = document.querySelector("#namePersonal");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

if (id) {
  fetch(url + id)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      (namePersonal.value = data.name),
        (email.value = data.email),
        (password.value = data.password);
      const originalData = data;
      personalForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let obj = {
          ...originalData,
          name: namePersonal.value,
          email: email.value,
          password: password.value,
        };
        console.log(obj);
  //----------------------MODALjs----------------------
  let modalContent = document.querySelector(".modal-content");
  let modalContainer = document.getElementById("modalContainer");
  setTimeout(function () {
    modalContainer.style.animation = "slideOut 0.5s forwards";
    setTimeout(function () {
      modalContainer.style.display = "none";
      modalContainer.style.animation = "";
    }, 500);
  }, 1500);

  document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("modalContainer").style.animation =
      "slideOut 0.5s forwards";
    setTimeout(function () {
      document.getElementById("modalContainer").style.display = "none";
      document.getElementById("modalContainer").style.animation = "";
    }, 300);
  });

  // modalContent.innerHTML= "Menu Saved Successfully!";
  modalContainer.style.display = "flex";
  setTimeout(() => {
    axios.post(url+id, obj);
    window.location.reload();
  }, 2500);
      });
    });
}

// ---------------- Edit Restoran ----------------

const editRestoranForm = document.querySelector(".editRestoran");
let nameRestoran = document.querySelector("#nameRestoran");
let phone = document.querySelector("#phone");
let locationRestoran = document.querySelector("#locationRestoran");
let monToSatStartTime = document.querySelector("#monToSatStartTime");
let monToSatEndTime = document.querySelector("#monToSatEndTime");
let sundayStartTime = document.querySelector("#sundayStartTime");
let sundayEndTime = document.querySelector("#sundayEndTime");
let mainPhoto = document.querySelector("#mainPhotoSrc");
let img = document.querySelectorAll(".imgSrcAll");
let imageDivAll = document.querySelector(`.imageDivAll`);
let PhotoArr = [];


function renderPhotos() {
  console.log(photos);

  imageDivAll.innerHTML = "";
  photos.forEach((elem, i) => {
    let uId = uuidv4();
    let unique = uId.substring(1, uId.length - 1);
    imageDivAll.innerHTML += `
    <div class="imageDivAll">
    <div class="imageDiv">
    <div class="display">
      <label for="${unique}" class="custom-file-upload">image</label>
      <i class="bi bi-trash3-fill deleteIcon" data-index="${i}"></i>
      </div>
      <input id="${unique}" type="file" class="photoForRes" style="display: none" data-index="${i}" />
      <div class="img">
        <img id="imgRestoran" class="imgSrcAll" src="${elem}" alt="image" />
      </div>
    </div>  
    `;
  });

  document.querySelectorAll(".photoForRes").forEach((input) => {
    input.addEventListener("input", (e) => {
      let index = e.target.dataset.index;

      let file = e.target.files[0];

      if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          photos.splice(index, 1, reader.result);
          renderPhotos();
        };
      }
    });
  });

  document.querySelectorAll(".deleteIcon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      let index = e.target.dataset.index;
      photos.splice(index, 1);
      renderPhotos();
    });
  });
}

if (id) {
  fetch(url + id)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      nameRestoran.value = data.restaurant.name;
      phone.value = data.restaurant.phone;
      locationRestoran.value = data.restaurant.location;
      monToSatStartTime.value = data.restaurant.workTime[0];
      monToSatEndTime.value = data.restaurant.workTime[1];
      sundayStartTime.value = data.restaurant.workTime[2];
      sundayEndTime.value = data.restaurant.workTime[3];
      mainPhoto.src = data.restaurant.backgroundPhoto;


      photos = data.restaurant.photos;

      renderPhotos();

    });
}
console.log();

let addFile = document.querySelector(".addFile");

addFile.addEventListener("click", () => {
  photos.push("");
  renderPhotos();
});

// Choose file for back image:
let fileInpBack = document.querySelector("#mainPhoto");
let mainPhotoSrc = document.querySelector("#mainPhotoSrc");
fileInpBack.addEventListener("input", (e) => {
  let selectedFile = e.target.files[0];
  if (selectedFile) {
    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = function () {
      mainPhotoSrc.src = reader.result;
    };
  }
});

// Send AllData
editRestoranForm.addEventListener("submit", (e) => {
  let i = 0;

  e.preventDefault();
  axios.get(url + id).then((res) => {
    let data = res.data;
    // let arrPhotos = [];
    let obj = {
      ...data,
      restaurant: {
        ...data.restaurant,
        name: nameRestoran.value,
        phone: phone.value,
        backgroundPhoto: mainPhotoSrc.src,
        photos: photos,
        location: locationRestoran.value,
        workTime: [
          monToSatStartTime.value,
          monToSatEndTime.value,
          sundayStartTime.value,
          sundayEndTime.value,
        ],
      },
    };


   //----------------------MODALjs----------------------
   let modalContent = document.querySelector(".modal-content");
   let modalContainer = document.getElementById("modalContainer");
   setTimeout(function () {
     modalContainer.style.animation = "slideOut 0.5s forwards";
     setTimeout(function () {
       modalContainer.style.display = "none";
       modalContainer.style.animation = "";
     }, 500);
   }, 1500);
 
   document.querySelector(".close").addEventListener("click", function () {
     document.getElementById("modalContainer").style.animation =
       "slideOut 0.5s forwards";
     setTimeout(function () {
       document.getElementById("modalContainer").style.display = "none";
       document.getElementById("modalContainer").style.animation = "";
     }, 300);
   });
 
   // modalContent.innerHTML= "Menu Saved Successfully!";
   modalContainer.style.display = "flex";
   setTimeout(() => {
     axios.post(url+id, obj);
     window.location.reload();
   }, 2500);

  });
});

// ------------------------------ Edit Menu -------------------------------

let tBodyHot = document.querySelector("#tbodyHot");
let tBodyCold = document.querySelector("#tbodyCold");
let tBodySalads = document.querySelector("#tBodySalads");
let tBodyDesserts = document.querySelector("#tBodyDesserts");
let tBodyBeverages = document.querySelector("#tBodyBeverages");


function populateTableRows(dishes, tbody, dishType, sort) {
  
  tbody.innerHTML = "";
  dishes.forEach((elem, index) => {
    let unique = uuidv4();

    tbody.innerHTML += `
      <tr>
        <td id="number">${index + 1}</td>
        <td>
          <label for="${unique}" class="custom-file-upload">image</label>
          <input id="${unique}" type="file" class="menuimages" style="display: none" data-labindex=${index} data-type='${sort}'/>
          <img src = "${elem.images}" width="20px" height="20px"/>
        </td>
        <td>
          <input class="menu name name${dishType}" type="text" data-labindex=${index} data-type='${sort}' value="${
      elem.name
    }" />
        </td>
        <td>
          <input type="text" class="menu about about${dishType}" data-labindex=${index} data-type='${sort}' value="${
      elem.about
    }" />
        </td> 
        <td><input type="text" class="menu cost cost${dishType}" data-labindex=${index} data-type='${sort}' value="${
      elem.cost
    }" /></td>
        <td><i class="bi bi-trash3-fill deleteRow" data-labindex=${index} data-type='${sort}'></i></td>
      </tr>`;
  });

  document.querySelectorAll(".menu").forEach((inputs) => {
    inputs.addEventListener("input", (e) => {
      let text = e.target.value;
      let labIndex = e.target.dataset.labindex;
      let arr = e.target.dataset.type;
      let type = e.target.classList[1];

      switch (arr) {
        case "hot":
          hot[labIndex][type] = text;

          break;

        case "cold":
          cold[labIndex][type] = text;

          break;
        case "salad":
          salad[labIndex][type] = text;

          break;
        case "desserts":
          desserts[labIndex][type] = text;

          break;
        case "beverages":
          beverages[labIndex][type] = text;

          break;
        default: console.log("Mig");
          break;
      }

    });
  });

  document.querySelectorAll('.menuimages').forEach(photoInp =>{

    photoInp.addEventListener('input', (e)=>{
      let index = e.target.dataset.labindex;
      let arr = e.target.dataset.type;


      let file = e.target.files[0];

      let reader = new FileReader();

      if(file){
        reader.readAsDataURL(file)
        reader.onload = () =>{
          e.target.nextElementSibling.src = reader.result;

          switch (arr) {
            case "hot":
              hot[index]['images'] = reader.result;
    
              break;
    
            case "cold":
              cold[index]['images'] = reader.result;
    
              break;
            case "salad":
              salad[index]['images'] = reader.result;
    
              break;
            case "desserts":
              desserts[index]['images'] = reader.result;
    
              break;
            case "beverages":
              beverages[index]['images'] = reader.result;
    
              break;
            default: console.log("Mig");
              break;
          }


        }
      }
    })
  })

  document.querySelectorAll('.deleteRow').forEach(trashBtn=>{
    trashBtn.addEventListener('click',(e)=>{
      let index = e.target.dataset.labindex;
      let arr = e.target.dataset.type;

      switch (arr) {
        case "hot":
          hot.splice(index,1)

          break;

        case "cold":
          cold.splice(index,1)

          break;
        case "salads":
          salad.splice(index,1)

          break;
        case "desserts":
          desserts.splice(index,1)

          break;
        case "beverages":
          beverages.splice(index,1)

          break;
        default: console.log("Mig");
          break;
      }
      renderTables()

    })
  })
}


function renderTables() {
  populateTableRows(hot, tBodyHot, "Hot", "hot");
  populateTableRows(cold, tBodyCold, "Cold", "cold");
  populateTableRows(salad, tBodySalads, "Salads", "salads");
  populateTableRows(desserts, tBodyDesserts, "Desserts", "desserts");
  populateTableRows(beverages, tBodyBeverages, "Beverages", "beverages");
}

axios.get(url + id).then((res) => {
  data = res.data;
  hot = data.restaurant.menu.hotDishes;
  cold = data.restaurant.menu.coldDishes;
  salad = data.restaurant.menu.salads;
  desserts = data.restaurant.menu.desserts;
  beverages = data.restaurant.menu.beverages;

  renderTables();
});



// ----------------Send Menu----------------
let saveMenu = document.querySelector(".saveMenu");
saveMenu.addEventListener("click", (e) => {
  axios.get(url + id).then((res) => {
    let data = res.data;

    let obj = {
      ...data,
      restaurant: {
        ...data.restaurant,
        menu : {
          hotDishes : hot,
          coldDishes : cold,
          salads : salad,
          desserts : desserts,
          beverages : beverages
        }
      },
    };

  //----------------------MODALjs----------------------
  let modalContent = document.querySelector(".modal-content");
  let modalContainer = document.getElementById("modalContainer");
  setTimeout(function () {
    modalContainer.style.animation = "slideOut 0.5s forwards";
    setTimeout(function () {
      modalContainer.style.display = "none";
      modalContainer.style.animation = "";
    }, 500);
  }, 1500);

  document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("modalContainer").style.animation =
      "slideOut 0.5s forwards";
    setTimeout(function () {
      document.getElementById("modalContainer").style.display = "none";
      document.getElementById("modalContainer").style.animation = "";
    }, 300);
  });

  // modalContent.innerHTML= "Menu Saved Successfully!";
  modalContainer.style.display = "flex";
  setTimeout(() => {
    axios.post(url+id, obj);
    window.location.reload();
  }, 2500);
  });
});




//
// ------GOPAGE------
let goPageLink = document.querySelector("#goPageLink");
goPageLink.href = `./restorans.html?id=${id}`;

//
// ____LInk & BArCode________
let link = document.querySelector("#getLink");
link.href = `/restorans.html?id=${id}`;
link.innerHTML = `http://127.0.0.1:5500/restorans.html?name=${user}`;

let barcode = document.querySelector("#barcode");
barcode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https:///restorans.html?id=${id}/`;

