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
const updateDeleteButtons = () => {
  const deleteButtons = document.querySelectorAll(".bi-trash3-fill");
  const deleteModal = document.getElementById("deleteModal");
  const confirmDeleteButton = document.getElementById("confirmDelete");
  const closeModalButtons = document.querySelectorAll(
    '[data-dismiss="modal"], .modal'
  );

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      deleteModal.style.display = "block";
      confirmDeleteButton.onclick = () => {
        deleteButton.parentElement.parentElement.remove();
        deleteModal.style.display = "none";
      };
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      deleteModal.style.display = "none";
    });
  });
};

updateDeleteButtons();

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

      // if (!allInputsFilled) {
      //   alert("Please fill in all fields before adding a new row.");
      //   return;
      // }
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
        <td><i class="bi bi-trash3-fill"></i></td>
      `;

      tbody.appendChild(newRow);

      updateDeleteButtons();
    }
  });
});

// ------------------ Add 3 point ------------------
document.querySelectorAll('input[type="text"]').forEach((input) => {
  const originalText = input.value;
  const maxLength = 15;

  if (originalText.length > maxLength) {
    input.value = originalText.substring(0, maxLength) + "...";
    input.addEventListener("focus", () => {
      input.value = originalText;
    });
    input.addEventListener("blur", () => {
      input.value = originalText.substring(0, maxLength) + "...";
    });
  }
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
// let fileInp = document.querySelector("#fileInp");
let img = document.querySelectorAll(".imgSrcAll");
let imageDivAll = document.querySelector(`.imageDivAll`);
let PhotoArr = [];

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
      let uId = uuidv4();
      let unique = uId.substring(1,uId.length-1);

      let lengthPhotos = data.restaurant.photos;
      lengthPhotos.forEach((elem) => {
        imageDivAll.innerHTML += `
        <div class="imageDivAll">
        <div class="imageDiv">
          <label for="${unique}" class="custom-file-upload"
            >Choose image</label
          >
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
      if(lengthPhotos.length>0){
        document.getElementById(`${unique}`).addEventListener("input", (e) => {
          let file = e.target.files[0];
          if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
              img.forEach((element) => {
                element.src = reader.result;
                PhotoArr.push(element.src)
              });
            };
          }
        });
      }
    });
}
console.log();

let addFile = document.querySelector(".addFile");

addFile.addEventListener("click", () => {
  let unicId = uuidv4();
  imageDivAll.innerHTML += `
  <div class="imageDiv">
  <label for="${unicId}" class="custom-file-upload">Choose image</label>
  <input id="${unicId}" type="file" style="display: none" />
  <div class="img">
    <img id="imgRestoran" src="" alt="image" />
  </div>
  </div>
`;
});

// Send AllData
editRestoranForm.addEventListener("submit", (e) => {
  let i = 0;
  img.forEach((element) => {
    element.src = data.restaurant.photos[i];
    i++;
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
          photos: PhotoArr,
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
});

// ---------------- Edit Restoran ----------------
//
//
// let nameHot = document.querySelectorAll('.nameHot');
// let aboutHot = document.querySelector('.aboutHot')
// let costHot = document.querySelector('.costHot');
// fetch(url + id)
//   .then((res) => res.json())
//   .then((data) => {
//     // console.log(data);
//     data.restaurant.menu.hotDishes.forEach(elem=>{
//       console.log(elem);

//     })
//   });

// document.querySelector('.saveMenu').addEventListener('click', (e) => {
//   e.preventDefault()
//   let hotDishesData = [];
//   document.querySelectorAll('.nameHot').forEach((nameInput, index) => {
//       let dish = {
//           name: nameInput.value,
//           about: document.querySelectorAll('.aboutHot')[index].value,
//           cost: document.querySelectorAll('.costHot')[index].value

//       };
//       hotDishesData.push(dish);
//   });
//   let updatedData = {
//     ...existingData,
//     hotDishes: [...existingData.hotDishes, ...hotDishesData],
//     // Diğer tabloların verileri de buraya eklenecek
// };
// axios.put(url+id, updatedData )

//   let requestBody = {
//     hotDishes: hotDishesData,
// };
// });

// ---------------HotDishes Datas---------------
let existingData;
let tBodyHot = document.querySelector("#tbodyHot");
let tBodyCold = document.querySelector("#tbodyCold");

axios.get(url + id).then((res) => {
  data = res.data;
  existingData = data;
  let unique = uuidv4();
  data.restaurant.menu.hotDishes.forEach((elem, index) => {
    tBodyHot.innerHTML += `
   <tr>
   <td id="number">${index + 1}</td>
   <td>
     <label for="${unique}" class="custom-file-upload"
       >image</label
     >
     <input
       id="${unique}"
       type="file"
       style="display: none"
     />
   </td>
   <td>
     <input
       class="name nameHot"
       type="text"
       value="${elem.name}"
     />
   </td>
   <td>
     <input
       type="text"
       class="about aboutHot"
       value="${elem.about}"
     />
   </td>
   <td><input type="text" class="cost costHot" value="${elem.cost}" /></td>
   <td><i class="bi bi-trash3-fill"></i></td>
 </tr>`;
  });
  console.log(data.restaurant.menu.coldDishes.length);
  data.restaurant.menu.coldDishes.forEach((elem, index) => {
    tBodyCold.innerHTML += `
   <tr>
   <td id="number">${index + 1}</td>
   <td>
     <label for="${unique}" class="custom-file-upload"
       >image</label
     >
     <input
       id="${unique}"
       type="file"
       style="display: none"
     />
   </td>
   <td>
     <input
       class="name nameHot"
       type="text"
       value="${elem.name}"
     />
   </td>
   <td>
     <input
       type="text"
       class="about aboutHot"
       value="${elem.about}"
     />
   </td>
   <td><input type="text" class="cost costHot" value="${elem.cost}" /></td>
   <td><i class="bi bi-trash3-fill"></i></td>
 </tr>`;
  });
});

// ----------------Send Menu----------------
let saveMenu = document.querySelector(".saveMenu");
console.log(saveMenu);
saveMenu.addEventListener("click", (e) => {
  e.preventDefault();
  let hotDishesData = [];
  document.querySelectorAll(".nameHot").forEach((nameInput, index) => {
    let dish = {
      name: nameInput.value,
      about: document.querySelectorAll(".aboutHot")[index].value,
      cost: document.querySelectorAll(".costHot")[index].value,
    };
    hotDishesData.push(dish);
  });

  console.log(hotDishesData);
  let obj = {
    ...existingData,
    restaurant: {
      ...existingData.restaurant,
      menu: {
        ...existingData.restaurant.menu,
        hotDishes: hotDishesData,
      },
    },
  };

  axios.put(url + id, obj).then((res) => {
    window.location.reload();
  });
});

//
// ------GOPAGE------
let goPageBtn = document.querySelector("#goPageLink");
goPageBtn.addEventListener("click", () => {
  window.location = `./restorans.html?name=${user}`;
});

let link = document.querySelector("#getLink");
link.innerHTML = `restorans.html?name=${user}`;
link.addEventListener("click", () => {
  window.location = `./restorans.html?name=${user}`;
});

let barcode = document.querySelector("#barcode");
barcode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://./restorans.html?name=${user}/`;
