let form = document.querySelector("#form");
let url = `http://localhost:3000/users`;
let signBtn = document.querySelector("#signUp2");

signBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let emailInp = document.querySelector("#email").value;
  let passInp = document.querySelector("#password").value;
  let nameInp = document.querySelector("#name").value;
  let obj = {
    name: nameInp,
    email: emailInp,
    password: passInp,
  };
  axios.post(url, obj).then((res) => {
    console.log(res.data);
    alert('successfully signed up');
  });
});

let loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let emailLogin = document.querySelector("#emailLogin").value;
  let passLogin = document.querySelector("#passwordLogin").value;

  fetch("http://localhost:3000/users", {})
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let currentUserInfo = data.find((user) => user.email == emailLogin);
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





const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');


signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});


signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});



// let respMenu = document.querySelector('#respMenu') 
// let register = document.querySelector('#register') 
// window.addEventListener("resize", () => {
//   if (window.Width > 768) {
//     respMenu.style.visibility = "hidden";
//     register.style.visibility = "visible";
//   }
//   else{
//     respMenu.style.visibility = "visible";
//     register.style.visibility = "hidden";
//   }
// });