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
          <label for="${unique}" class="custom-file-upload">Choose image</label>
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
      console.log(data);
      (namePersonal.value = data.name),
        (email.value = data.email),
        (password.value = data.password);
      // personalForm.innerHTML += `
      // <label for="namePersonal">Full Name :</label>
      // <input type="text" id="namePersonal" required value =" ${data.name}" />

      // <label for="email">E-mail :</label>
      // <input type="email" id="email" required  value = "${data.email}"/>

      // <label for="email">Password :</label>
      // <input type="text" id="password" required value = "${data.password}"/>

      // <input type="submit" value="Save" class="save saveRestoran" />
      // `;
      const originalData = data;
      // Change Data
      // let namePersonal = document.querySelector("#namePersonal");
      // let email = document.querySelector("#email");
      // let password = document.querySelector("#password");
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
let photos = [];
let fileInp = document.querySelector("#fileInp");
let img = document.querySelector("#imgRestoran");
// let fileInp = document.querySelector(`#${unicId}`);
// let img = document.querySelector(`#${unicId}`);
// let unicId = uuidv4();


if (id) {
  fetch(url + id)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      nameRestoran.value = data.restaurant.name;
      phone.value = data.restaurant.phone;
      locationRestoran.value = data.restaurant.location;
      monToSatStartTime.value = data.restaurant.workTime[0];
      monToSatEndTime.value = data.restaurant.workTime[1];
      sundayStartTime.value = data.restaurant.workTime[2];
      sundayEndTime.value = data.restaurant.workTime[3];
      // let uniqueId = uuidv4();
      // editRestoranForm.innerHTML += `
      // <label for="nameRestoran">Restaurant Name:</label>
      //  <input type="text" id="nameRestoran" required value = "${data.restaurant.name}" />
      //  <label for="tel">Phone Number:</label>
      //  <input
      //    type="tel"
      //    id="phone"
      //    placeholder="077-000-00-00"
      //    pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
      //    required
      //    value ="${data.restaurant.phone}"
      //  />
      //  <label for="location">Location:</label>
      //  <input type="text" id="locationRestoran" required value = "${data.restaurant.location}" />

      //  <!------------- Hours ------------->

      //  <label>Monday - Saturday Work Hours:</label>
      //  <div>
      //    <label for="monToSatStartTime">Start Time:</label>
      //    <input
      //      type="time"
      //      id="monToSatStartTime"
      //      name="monToSatStartTime"
      //      min="00:00"
      //      max="23:59"
      //      required
      //      value="${data.restaurant.workTime[0]}"
      //    />
      //    <label for="monToSatEndTime">End Time:</label>
      //    <input
      //      type="time"
      //      id="monToSatEndTime"
      //      name="monToSatEndTime"
      //      min="00:00"
      //      max="23:59"
      //      required
      //      value="${data.restaurant.workTime[1]}"
      //    />
      //  </div>
      //  <label>Sunday Work Hours:</label>
      //  <div>
      //    <label for="sundayStartTime">Start Time:</label>
      //    <input
      //      type="time"
      //      id="sundayStartTime"
      //      name="sundayStartTime"
      //      min="00:00"
      //      max="23:59"
      //      required
      //      value="${data.restaurant.workTime[2]}"
      //    />
      //    <label for="sundayEndTime">End Time:</label>
      //    <input
      //      type="time"
      //      id="sundayEndTime"
      //      name="sundayEndTime"
      //      min="00:00"
      //      max="23:59"
      //     required
      //     value="${data.restaurant.workTime[3]}"
      //   />
      //   </div>
      //     <label for="file">Add Restaurant's photos</label>
      //     <div class="displayFile">

      //     <div class="imageDiv">
      //       <label for="fileInp" class="custom-file-upload">Choose image</label>
      //       <input id="fileInp" type="file" style="display: none" />
      //       <div class="img"><img id ="imgRestoran" src="" alt="image"></div>
      //     </div>

      //     <button class="plus addFile">+</button>
      //   </div>

      //     <input type="submit" value="Save" class="save saveRestoran" />
      //   `;
      // let nameRestoran = document.querySelector("#nameRestoran").value;
      // let phone = document.querySelector("#phone").value;
      // let location = document.querySelector("#locationRestoran").value;
      // let monToSatStartTime =
      //   document.querySelector("#monToSatStartTime").value;
      // let monToSatEndTime = document.querySelector("#monToSatEndTime").value;
      // let sundayStartTime = document.querySelector("#sundayStartTime").value;
      // let sundayEndTime = document.querySelector("#sundayEndTime").value;
      // let photos = [];
      // let fileInp = document.querySelector("#fileInp");
      // let img = document.querySelector("#imgRestoran");

      // fileInp.addEventListener("input", () => {
      //   let file = e.target.files[0];
      //   if (file) {
      //     let reader = new FileReader();
      //     reader.readAsDataURL(file);
      //     reader.onload = function () {
      //       img.src = reader.result;
      //       console.log(img.src);
      //     };
      //   }
      // });

      // const originalData = data;
      // // Change Data
      // editRestoranForm.addEventListener("submit", (e) => {
      //   e.preventDefault();

      //   let obj = {
      //     ...originalData,
      //     restaurant: {
      //       ...originalData.restaurant,
      //       name: nameRestoran,
      //       phone: phone,
      //       location: location,
      //       workTime: [
      //         monToSatStartTime,
      //         monToSatEndTime,
      //         sundayStartTime,
      //         sundayEndTime,
      //       ],
      //       // fileInp: fileInp,
      //     },
      //   };
      //   console.log(obj);

      //   axios.put(url + id, obj).then((res) => {
      //     // window.location.reload();
      //   });
      // });
    });
}

//------- Choose File-------

fileInp.addEventListener("input", (e) => {
  let file = e.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      img.src = reader.result;
    };
  }
});


editRestoranForm.addEventListener("submit", (e) => {
  e.preventDefault();
  axios.get(url + id).then((res) => {
    let data = res.data;
    let obj = {
      ...data,
      restaurant: {
        ...data.restaurant,
        name: nameRestoran.value,
        phone: phone.value,
        photos:[
          img.src
        ],
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
    axios.put(url + id, obj);
  });
});

// Edit Menu:
// "10:00 AM - 10:00 PM, 12:00 PM - 11:00 PM"
