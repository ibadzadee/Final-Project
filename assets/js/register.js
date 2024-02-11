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

  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => {
      let existingUser = data.find((user) => user.email === emailInp);
      if (existingUser) {
        alert("This email already exists");
      } else {
        axios.post(url, obj).then((res) => {
          console.log(res.data);
          alert("Successfully Signed Up!");
        });
      }
    });
});

let loginBtn = document.querySelector("#login");
console.log(loginBtn);

loginBtn.addEventListener("submit", (e) => {
  e.preventDefault();
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
          console.log("Wrong password");
        }
      } else {
        console.log("Wrong email");
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



