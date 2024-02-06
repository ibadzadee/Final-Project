let logoffEl = document.querySelector("#logoff");
let infoEl = document.querySelector("#info");
let logoutBtn = document.querySelector("#logout");

let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).name
  : null;

if (user) {
  infoEl.innerHTML = `<p>Welcome, ${user}!`;
  infoEl.style.display = "block";
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
