let form = document.querySelector("#form");
// let url = `http://localhost:3000/users/`;
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let emailInp = document.querySelector("#emailInp").value;
    let passInp = document.querySelector("#passInp").value;
    let nameInp = document.querySelector("#nameInp").value;
    fetch('http://localhost:3000/users', {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email : emailInp, password : passInp}), 
      }).then(res=>res.json())
      .then(data => console.log(data))
});
