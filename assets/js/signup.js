let form = document.querySelector("#form");
let url = `http://localhost:3000/users`;
console.log("salam!");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let emailInp = document.querySelector("#emailInp").value;
  let passInp = document.querySelector("#passInp").value;
  let nameInp = document.querySelector("#nameInp").value;
  let obj = {
    name: nameInp,
    email: emailInp,
    password: passInp,
  };
  axios.post(url, obj)
  .then((res) => {
    console.log(res.data);
    window.location = './admin.html'
  });
});

// fetch('http://localhost:3000/users', {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({name:nameInp , email : emailInp, password : passInp}),
//       }).then(res=>res.json())
//       .then(data => console.log(data))
