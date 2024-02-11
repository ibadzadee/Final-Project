let logoffEl = document.querySelector("#logoff");
let infoEl = document.querySelector("#info");
let logoutBtn = document.querySelector(".logout");

let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).name
  : null;

function uuidv4() {
    return '*xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx*'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == '*x*' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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

// -------------Delete button---Modal-------------
const updateDeleteButtons = () => {
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
};

updateDeleteButtons();

// ------------------------ Add Table ------------------------

document.querySelectorAll(".addTab").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-key");
    const table = document.querySelector(`table[data-key="${key}"]`);

    if (table) {
      const tbody = table.querySelector("tbody");
      let allInputsFilled = true;

      tbody.querySelectorAll("tr").forEach((row) => {
        const inputs = row.querySelectorAll('input');
inputs.forEach(e=>console.log(e.value))
        inputs.forEach((input) => {
          if (input.value.trim() === "") {
            allInputsFilled = false;
            return;
          }
        });
      });

      if (!allInputsFilled) {
        alert("Please fill in all fields before adding a new row.");
        return;
      }
      let unique = uuidv4();
      const rowCount = tbody.querySelectorAll("tr").length + 1;
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${rowCount}</td>
        <td>
          <label for="${unique}" class="custom-file-upload">Choose image</label>
          <input type="file" id="${unique}" style="display : none" >
        </td>
        <td><input type="text" ></td>
        <td><input type="text" ></td>
        <td><input type="text" ></td>
        <td><i class="bi bi-trash3-fill"></i></td>
      `;

      tbody.appendChild(newRow);

      updateDeleteButtons();
    }
  });
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

// add-EditRestoran
  let addFileButton = document.querySelector(".addFile");

  addFileButton.addEventListener("click", function () {
    let fileInput = document.querySelector("#fileInp");

    if (fileInput.files.length === 0) {
      alert("file image is undefined");
    } else {
      let newFileInput = document.createElement("input");
      newFileInput.type = "file";
      newFileInput.style.display = "none";
      newFileInput.required = true;
      newFileInput.id = "fileInp";
      fileInput.parentNode.insertBefore(newFileInput, addFileButton);

      newFileInput.click();
    }
  });
