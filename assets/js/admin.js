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
// var addButtons = document.querySelectorAll('.addTab');

// addButtons.forEach(function(addButton) {
//     addButton.addEventListener('click', function() {
//         var table = this.parentElement.querySelector('table tbody');

//         var newRow = document.createElement('tr');

//         var inputs = table.querySelectorAll('input');
//         var isEmpty = false;
//         inputs.forEach(function(input) {
//             if (input.value === "") {
//                 isEmpty = true;
//             }
//         });

//         if (isEmpty) {
//             alert("Lütfen tüm alanları doldurun.");
//         } else {
//             newRow.innerHTML = `
//                 <td id="number"></td>
//                 <td>
//                     <input type="file" />
//                 </td>
//                 <td>
//                     <input type="text" value="" />
//                 </td>
//                 <td>
//                     <input type="text" value="" />
//                 </td>
//                 <td>
//                     <input type="text" value="" />
//                 </td>
//             `;

//             table.appendChild(newRow);
//         }
//     });
// });

// Metni kısalt ve üç nokta ekle
document.querySelectorAll('input[type="text"]').forEach((input) => {
  const originalText = input.value;
  const maxLength = 15; // Dilediğiniz bir uzunluk belirleyebilirsiniz

  if (originalText.length > maxLength) {
    input.value = originalText.substring(0, maxLength) + "...";
    input.addEventListener("focus", () => {
      input.value = originalText;
    });
    input.addEventListener("blur", () => {
      input.value = originalText.substring(0, maxLength) + "...";
    });
  }
});




// -------------Delete button---Modal-------------
const deleteButtons = document.querySelectorAll(".bi-trash3-fill");
const deleteModal = document.getElementById("deleteModal");
const confirmDeleteButton = document.getElementById("confirmDelete");
const closeModalButtons = document.querySelectorAll('[data-dismiss="modal"], .modal');

deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
        deleteModal.style.display = "block";
        confirmDeleteButton.onclick = () => {
            deleteButton.parentElement.parentElement.remove();
            deleteModal.style.display = "none";
        };
    });
});

closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        deleteModal.style.display = "none";
    });
});






// ------------------------Add Table------------------------

// Add buttons
let addButtons = document.querySelectorAll(".addTab");

// Add event listener to each add button
addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let key = button.getAttribute("data-key"); // Button's data-key attribute value

    // Find the table corresponding to the button's data-key
    let table = document.querySelector(`table[data-key="${key}"]`);
    if (table) {
      // Find the tbody element inside the table
      let tbody = table.querySelector("tbody");

      // Check if all inputs in all rows are filled
      let allInputsFilled = true;
      let rows = tbody.querySelectorAll("tr");
      rows.forEach((row) => {
        let inputs = row.querySelectorAll("input");
        inputs.forEach((input) => {
          if (input.value.trim() === '') {
            allInputsFilled = false;
            return;
          }
        });
      });

      // If any input is empty, show alert and return
      if (!allInputsFilled) {
        alert("Please fill in all fields before adding a new row.");
        return;
      }

      // Get the number of existing rows
      let rowCount = tbody.querySelectorAll("tr").length;

      // Create a new row (tr)
      let newRow = document.createElement("tr");

      // Create table data (td) elements for each column
      let numberCell = document.createElement("td");
      numberCell.textContent = rowCount + 1; // Increment the row number
      newRow.appendChild(numberCell);

      let fileCell = document.createElement("td");
      fileCell.innerHTML = '<input type="file" id="fileMenu" />';
      newRow.appendChild(fileCell);

      let nameCell = document.createElement("td");
      nameCell.innerHTML = '<input type="text" id="name" />';
      newRow.appendChild(nameCell);

      let aboutCell = document.createElement("td");
      aboutCell.innerHTML = '<input type="text" id="about" />';
      newRow.appendChild(aboutCell);

      let costCell = document.createElement("td");
      costCell.innerHTML = '<input type="text" id="cost" />';
      newRow.appendChild(costCell);

      let deleteCell = document.createElement("td");
      deleteCell.innerHTML = '<i class="bi bi-trash3-fill"></i>';
      newRow.appendChild(deleteCell);

      // Append the new row to the table body
      tbody.appendChild(newRow);
    }
  });
});
