function emailSend() {
  let params ={
    from_name : document.getElementById("firstName").value,
    email_id: document.getElementById("email").value,
    message: document.getElementById("message").value
  }
  emailjs.send("service_0ch8q6j" , "template_njwvjkw", params).then(function(res){
    // alert("success" , res.status)
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
  
    modalContainer.style.display = "flex";
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  })

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
