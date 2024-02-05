let nav = document.querySelector("nav");
window.addEventListener("scroll" , ()=>{
    if (window.scrollY > 50) {
        nav.style.position = "sticky"
        nav.style.background = "#0D0C28";
        nav.style.padding = "8px 0px";
      } 
      else {
        nav.style.position = "absolute"
        nav.style.background = "";
        nav.style.opacity = "";
        nav.style.padding = "";
      }
})

let logInButton = document.querySelector('#logIn')
let signUpButton = document.querySelector('#signUp')

logInButton.addEventListener("click" , ()=>{
  window.location = './login.html'
})

signUpButton.addEventListener("click" , ()=>{
  window.location = './signup.html'
})