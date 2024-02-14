let form = document.querySelector("#form");
let url = `http://localhost:3000/users`;
let signBtn = document.querySelector("#signUpForm");

console.log(signBtn);

signBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  let emailInp = document.querySelector("#email").value;
  let passInp = document.querySelector("#password").value;
  let nameInp = document.querySelector("#name").value;
  let obj = {
    name: nameInp,
    email: emailInp,
    password: passInp,
  };
// ----------------------MODAL js----------------------
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

  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => {
      let existingUser = data.find((user) => user.email === emailInp);
      if (existingUser) {
        modalContent.innerHTML = `This email already exists`;
        modalContainer.style.background = "red";
        modalContainer.style.display = "block";
      } else {
        setTimeout(() => {
          axios.post(url, obj).then((res) => {
            window.location.reload();
          });
        }, 2500);
        modalContent.innerHTML = `Successfully Signed Up`;
        modalContainer.style.background = "";
        modalContainer.style.display = "block";
      }
    });
});

let loginBtn = document.querySelector("#login");
console.log(loginBtn);

loginBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  // ----------------------MODAL js----------------------
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
  // 
  // 
  let emailLogin = document.querySelector("#emailLogin").value;
  let passLogin = document.querySelector("#passwordLogin").value;

  console.log(emailLogin);
  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let currentUserInfo = data.find((user) => user.email == emailLogin);
      console.log(currentUserInfo);
      if (currentUserInfo) {
        if (currentUserInfo.password == passLogin) {
          localStorage.setItem("currentUser", JSON.stringify(currentUserInfo));
          window.location = "./admin.html";
        } else {
          console.log("wrong Pass");
          modalContent.innerHTML = `Wrong password!`;
          modalContainer.style.background = "red";
          modalContainer.style.display = "block";
        }
      } else {
        console.log("wrong Email");
        modalContent.innerHTML = `Wrong Email!`;
        modalContainer.style.background = "red";
        modalContainer.style.display = "block";
      }
    });
});

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// ----------------- Resp < 600px -----------------

let signBtn2 = document.querySelector("#signUpForm2");

console.log(signBtn);

signBtn2.addEventListener("submit", (e) => {
  e.preventDefault();
  let emailInp = document.querySelector("#email2").value;
  let passInp = document.querySelector("#password2").value;
  let nameInp = document.querySelector("#name2").value;
  let obj = {
    name: nameInp,
    email: emailInp,
    password: passInp,
  };
  axios.post(url, obj).then((res) => {
    console.log(res.data);
    alert("successfully signed up");
  });
});

let loginBtn2 = document.querySelector("#login2");
console.log(loginBtn);

loginBtn2.addEventListener("submit", (e) => {
  e.preventDefault();
  let emailLogin = document.querySelector("#emailLogin2").value;
  let passLogin = document.querySelector("#passwordLogin2").value;

  console.log(emailLogin);
  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let currentUserInfo = data.find((user) => user.email == emailLogin);
      console.log(currentUserInfo);
      if (currentUserInfo) {
        if (currentUserInfo.password == passLogin) {
          localStorage.setItem("currentUser", JSON.stringify(currentUserInfo));
          window.location = "./admin.html";
        } else {
          console.log("Wrong password");
        }
      } else {
        console.log("Wrong email");
      }
    });
});
