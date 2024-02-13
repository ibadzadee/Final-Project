function emailSend() {
  let userName = document.querySelector("#name").value;
//   let password = document.querySelector("#password").value;  
  let email = document.querySelector("#email").value;
  let messageBody = "Name: " + userName + "<br/> Email: " + email;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "ld6xwe2ez@code.edu.az",
    Password: "8BFDF29AD6E603256DEC0276B51F3B0BDF6A3C711522ACFE65A24DE62965F18E4425D01A",
    To: "sara.ibadzade@gmail.com",
    From: "ld6xwe2ez@code.edu.az",
    Subject: "This is the subject",
    Body: messageBody,
    SecureToken: "your_secure_token",
  }).then((message) => alert(message));
}



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
