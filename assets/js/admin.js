let logoffEl = document.querySelector("#logoff");
let infoEl = document.querySelector("#info");
let logoutBtn = document.querySelector(".logout");

let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).name
  : null;

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

// ------------- Add Table ------------- 
var addButtons = document.querySelectorAll('.addTab');

addButtons.forEach(function(addButton) {
    addButton.addEventListener('click', function() {
        var table = this.parentElement.querySelector('table tbody');

        var newRow = document.createElement('tr');

        var inputs = table.querySelectorAll('input');
        var isEmpty = false;
        inputs.forEach(function(input) {
            if (input.value === "") {
                isEmpty = true;
            }
        });

        if (isEmpty) {
            alert("Lütfen tüm alanları doldurun.");
        } else {
            newRow.innerHTML = `
                <td id="number"></td>
                <td>
                    <input type="file" />
                </td>
                <td>
                    <input type="text" value="" />
                </td>
                <td>
                    <input type="text" value="" />
                </td>
                <td>
                    <input type="text" value="" />
                </td>
            `;

            table.appendChild(newRow);
        }
    });
});


