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

// ------------------ Add 3 point ------------------
document.querySelectorAll('input[type="text"]').forEach((input) => {
  const originalText = input.value;
  const maxLength = 15;

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
const closeModalButtons = document.querySelectorAll(
  '[data-dismiss="modal"], .modal'
);

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


// ------------------------ Add Table ------------------------

// document.querySelectorAll('.addTab').forEach((button) => {
//   button.addEventListener('click', () => {
//     const key = button.getAttribute('data-key');
//     const table = document.querySelector(`table[data-key="${key}"]`);
    
//     if (table) {
//       const tbody = table.querySelector('tbody');
//       let allInputsFilled = true;

//       tbody.querySelectorAll('tr').forEach((row) => {
//         const inputs = row.querySelectorAll('input[type="text"]');
        
//         inputs.forEach((input) => {
//           if (input.value.trim()  === '') {
//             allInputsFilled = false;
//             return;
//           }
//         });
//       });

//       if (!allInputsFilled) {
//         alert('Please fill in all fields before adding a new row.');
//         return;
//       }

//       const rowCount = tbody.querySelectorAll('tr').length + 1;
//       const newRow = document.createElement('tr');
//       newRow.innerHTML = `
//         <td>${rowCount}</td>
//         <td>
//           <label for="fileMenu${key}" class="custom-file-upload">Choose image</label>
//           <input id="fileMenu${key}" type="file" style="display: none">
//         </td>
//         <td><input type="text" id="name"></td>
//         <td><input type="text" id="about"></td>
//         <td><input type="text" id="cost"></td>
//         <td><i class="bi bi-trash3-fill"></i></td>
//       `;
      
//       tbody.appendChild(newRow);
//     }
//   });
// });


let addButtons = document.querySelectorAll(".addTab");

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let key = button.getAttribute("data-key"); 

    let table = document.querySelector(`table[data-key="${key}"]`);
    if (table) {
      let tbody = table.querySelector("tbody");

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

      if (!allInputsFilled) {
        alert("Please fill in all fields before adding a new row.");
        return;
      }

      let rowCount = tbody.querySelectorAll("tr").length;

      let newRow = document.createElement("tr");

      let numberCell = document.createElement("td");
      numberCell.textContent = rowCount + 1; 
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

      tbody.appendChild(newRow);
    }
  });
});
