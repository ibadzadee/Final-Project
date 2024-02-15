let logoffEl = document.querySelector("#logoff");
let infoEl = document.querySelector("#info");
let logoutBtn = document.querySelector(".logout");

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

// -------------Delete button---Modal-------------
// const updateDeleteButtons = () => {
//   const deleteButtons = document.querySelectorAll(".bi-trash3-fill");
//   const deleteModal = document.getElementById("deleteModal");
//   const confirmDeleteButton = document.getElementById("confirmDelete");
//   const closeModalButtons = document.querySelectorAll(
//     '[data-dismiss="modal"], .modal'
//   );

//   deleteButtons.forEach((deleteButton) => {
//     deleteButton.addEventListener("click", () => {
//       deleteModal.style.display = "block";
//       confirmDeleteButton.onclick = () => {
//         deleteButton.parentElement.parentElement.remove();
//         deleteModal.style.display = "none";
//       };
//     });
//   });

//   closeModalButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       deleteModal.style.display = "none";
//     });
//   });
// };

// updateDeleteButtons();

// ------------------------ Add Table ------------------------

document.querySelectorAll(".addTab").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-key");
    const table = document.querySelector(`table[data-key="${key}"]`);

    if (table) {
      const tbody = table.querySelector("tbody");
      let allInputsFilled = true;

      tbody.querySelectorAll("tr").forEach((row) => {
        const inputs = row.querySelectorAll("input");
        inputs.forEach((e) => console.log(e.value));
        inputs.forEach((input) => {
          if (input.value.trim() === "") {
            allInputsFilled = false;
            return;
          }
        });
      });

      if (!allInputsFilled) {
        alert("Please fill in all fields before adding a new row.");
        return;
      }
      let unique = uuidv4();
      const rowCount = tbody.querySelectorAll("tr").length + 1;
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${rowCount}</td>
        <td>
          <label for="${unique}" class="custom-file-upload">image</label>
          <input type="file" id="${unique}" style="display : none" >
        </td>
        <td><input type="text" ></td>
        <td><input type="text" ></td>
        <td><input type="text" ></td>
        <td><i class="bi bi-trash3-fill"</i></td>
      `;

      tbody.appendChild(newRow);
    }
  });
});

// ------------------ Add 3 point ------------------
// document.querySelectorAll('input[type="text"]').forEach((input) => {
//   const originalText = input.value;
//   const maxLength = 15;

//   if (originalText.length > maxLength) {
//     input.value = originalText.substring(0, maxLength) + "...";
//     input.addEventListener("focus", () => {
//       input.value = originalText;
//     });
//     input.addEventListener("blur", () => {
//       input.value = originalText.substring(0, maxLength) + "...";
//     });
//   }
// });

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
        axios.put(url + id, obj);
        window.location.reload();
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
// let inputColor = document.querySelector('#textColor')

// let img = document.querySelector(`#${unicId}`);
// let unicId = uuidv4();

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
      // inputColor.value = data.restaurant.nameColor;
      let uId = uuidv4();
      let unique = uId.substring(1, uId.length - 1);

      let lengthPhotos = data.restaurant.photos;
      lengthPhotos.forEach((elem) => {
        imageDivAll.innerHTML += `
        <div class="imageDivAll">
        <div class="imageDiv">
        <div class="display">
          <label for="${unique}" class="custom-file-upload">image</label>
          <i class="bi bi-trash3-fill"></i>
          </div>
          <input id="${unique}" type="file" style="display: none" />
          <div class="img">
            <img id="imgRestoran" class="imgSrcAll" src="${elem}" alt="image" />
          </div>
        </div>  
        `;
      });
      // console.log(lengthPhotos);
      // let i = 0;
      img.forEach((element, index) => {
        element.src = data.restaurant.photos[index];
        // i++;
      });
      //------- Choose File-------
      // if (lengthPhotos.length > 0) {
      //   document.getElementById(`${unique}`).addEventListener("input", (e) => {
      //     let file = e.target.files[0];
      //     if (file) {
      //       let reader = new FileReader();
      //       reader.readAsDataURL(file);
      //       reader.onload = function () {
      //         img.forEach((element) => {
      //           element.src = reader.result;
      //           PhotoArr.push(element.src);
      //         });
      //       };
      //     }
      //   });
      // }
    });
}
console.log();

let addFile = document.querySelector(".addFile");

addFile.addEventListener("click", () => {
  let unicId = uuidv4();
  imageDivAll.innerHTML += `
  <div class="imageDiv">
  <div class="display">
  <label for="${unicId}" class="custom-file-upload">image</label>
  <i class="bi bi-trash3-fill"></i>
  </div>
  <input id="${unicId}" type="file" style="display: none" />
  <div class="img">
    <img id="imgRestoran" src="" alt="image" />
  </div>
  </div>
`;
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
  // img.forEach((element) => {
  //   element.src = data.restaurant.photos[i];
  //   i++;
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
        // nameColor: inputColor.value,
        // photos: PhotoArr,
        location: locationRestoran.value,
        workTime: [
          monToSatStartTime.value,
          monToSatEndTime.value,
          sundayStartTime.value,
          sundayEndTime.value,
        ],
        // fileInp: fileInp,
      },
    };
    // if(img.src !==''){
    axios.put(url + id, obj);
    // }else{
    //   alert("please choose a new image")
    // }
  });
});
// });

// let deleteMainPhoto = document.querySelector('.deleteMainPhoto');
// deleteMainPhoto.addEventListener('click' , ()=>{

//   axios.delete(url+id+'/backgroundPhoto')
//   // axios.get(url+id).then((res ,index)=>{
//   //   let data = res.data;
//   //   console.log(data);
//   //   let photo =data.restaurant.backgroundPhoto;
//   //   photo.remove();
//   //   // console.log(data.restaurant.backgroundPhoto);
//   //   // axios.delete(url+id).then(elem=>{
//   //   //   elem.remove();
//   //   // })
//   // })
// })



// ------------------------------ Edit Menu -------------------------------
let existingData;
let tBodyHot = document.querySelector("#tbodyHot");
let tBodyCold = document.querySelector("#tbodyCold");
let tBodySalads = document.querySelector("#tBodySalads");
let tBodyDesserts = document.querySelector("#tBodyDesserts");
let tBodyBeverages = document.querySelector("#tBodyBeverages");

function populateTableRows(dishes, tbody, dishType) {
  let unique = uuidv4();
  dishes.forEach((elem, index, obj) => {
    tbody.innerHTML += `
      <tr>
        <td id="number">${index + 1}</td>
        <td>
          <label for="${unique}" class="custom-file-upload">image</label>
          <input id="${unique}" type="file" style="display: none" />
        </td>
        <td>
          <input class="name name${dishType}" type="text" value="${
      elem.name
    }" />
        </td>
        <td>
          <input type="text" class="about about${dishType}" value="${
      elem.about
    }" />
        </td> 
        <td><input type="text" class="cost cost${dishType}" value="${
      elem.cost
    }" /></td>
        <td><i class="bi bi-trash3-fill" onclick="deleteMenuItems(${
          index + 1
        })"></i></td>
      </tr>`;
  });
}
axios.get(url + id).then((res) => {
  data = res.data;

  populateTableRows(data.restaurant.menu.hotDishes, tBodyHot, "Hot");
  populateTableRows(data.restaurant.menu.coldDishes, tBodyCold, "Cold");
  populateTableRows(data.restaurant.menu.salads, tBodySalads, "Salads");
  populateTableRows(data.restaurant.menu.desserts, tBodyDesserts, "Desserts");
  populateTableRows(
    data.restaurant.menu.beverages,
    tBodyBeverages,
    "Beverages"
  );
});

//------- delete Data from Table--------
// function deleteMenuItems(index) {
//   // axios.delete(`${url}/${id}/restaurant/${index}`)
//   console.log(`${url}/${id}?/restaurant/${index}`);
//   // axios.get(url+id).then(res=>{
//   //   let data = res.data;
//   //   data.restaurant.menu.hotDishes.forEach((elem , index , obj)=>{

//   //     console.log(obj[index]);
//   //   })
//   //   // console.log(index);
//   // })
// }

// ----------------Send Menu----------------
// let saveMenu = document.querySelector(".saveMenu");
// let nameHot = document.querySelectorAll(".nameHot");
// let aboutHot = document.querySelectorAll(".aboutHot");
// let costHot = document.querySelectorAll(".costHot");
// let nameHotArr = [];
// let aboutHotArr = [];
// let costHotArr = [];
// saveMenu.addEventListener("click", () => {
//   nameHot.forEach((elem) => {
//     nameHotArr.push(elem.value);
//   });
// });
// console.log(nameHotArr);
// axios.get(url + id).then((res) => {
//   let data = res.data;
// });

// });

// let updatedHotDishes = [];
// document.querySelectorAll(".nameHot").forEach((nameInput, index) => {
//   let dish = {
//     name: nameInput.value,
//     about: document.querySelectorAll(".aboutHot")[index].value,
//     cost: document.querySelectorAll(".costHot")[index].value,
//   };
//   updatedHotDishes.push(dish);
// });

// axios.get(url+id).then(res=>{
//   let existingData = res.data;
//   let obj = {
//       ...existingData,
//       restaurant: {
//           ...existingData.restaurant,
//           menu: {
//               ...existingData.restaurant.menu,
//               hotDishes: updatedHotDishes,
//           },
//       },
//     };
// })

//     axios.put(url + id, obj)
//       .then((res) => {
//         window.location.reload();
//       })

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

console.log("sara");
