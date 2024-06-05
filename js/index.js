var bookmarNameInput = document.getElementById("bookmarName");
var websiteUrlInput = document.getElementById("websiteUrl");
var serchInput = document.getElementById("serchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var bookMarkes;

if (localStorage.getItem("product") !== null) {
  bookMarkes = JSON.parse(localStorage.getItem("product"));
  displayBookMark(bookMarkes);
} else {
  bookMarkes = [];
}

addBtn.addEventListener("click", function () {
  if (
    validateBookmarkName(bookmarNameInput) &&
    validateBookmarkName(websiteUrlInput) == true
  ) {
    var newBookMarks = {
      SiteName: bookmarNameInput.value,
      SiteUrl: websiteUrlInput.value,
    };
    bookMarkes.push(newBookMarks);
    displayBookMark(bookMarkes);
    clearInput();
    localStorage.setItem("product", JSON.stringify(bookMarkes));
  } else {
    Swal.fire({
      title: "invalid data?",
      text: `${
        bookmarNameInput.value == "" ? "please inter you site name" : ""
      } ${websiteUrlInput.value == true ? "" : "URL invalid"}`,
      icon: "error",
    });
  }
});

function displayBookMark(arr) {
  box = ``;
  for (var i = 0; i < arr.length; i++) {
    box += `<tr>
    <td>${i + 1}</td>
    <td>${arr[i].SiteName}</td>              
    <td>
        <a class="text-decoration-none text-white btn btn-visit text-white bg-warning" target="_blank" href="${
          arr[i].SiteUrl
        }"><i class="fa-solid fa-eye pe-2"></i>visit</a>
    </td>
    <td>
      <button onclick="setFormForUpdate(${i});" class="btn btn-delete bg-secondary
      text-white pe-2" data-index="0">
        <i class="fa-solid fa-trash-can"></i>
        update
      </button>
    </td>
    <td>
      <button onclick="deleteBookmark(${i})" class="btn btn-delete bg-danger text-white pe-2" data-index="0">
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
    </td>
</tr>`;
  }
  document.getElementById("rowData").innerHTML = box;
}
function clearInput() {
  bookmarNameInput.value = null;
  websiteUrlInput.value = null;
}

serchInput.addEventListener("keyup", function () {
  cartona = "";
  var term = serchInput.value;
  termBookmark = [];
  for (var i = 0; i < bookMarkes.length; i++) {
    if (bookMarkes[i].SiteName.toLowerCase().includes(term.toLowerCase())) {
      termBookmark.push(bookMarkes[i]);
    }
    displayBookMark(termBookmark);
  }
});

function deleteBookmark(index) {
  bookMarkes.splice(index, 1);
  displayBookMark(bookMarkes);
  localStorage.setItem("product", JSON.stringify(bookMarkes));
}

var updateIndex;
function setFormForUpdate(i) {
  updateIndex = i;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  bookmarNameInput.value = bookMarkes[updateIndex].SiteName;
  websiteUrlInput.value = bookMarkes[updateIndex].SiteUrl;
}

updateBtn.addEventListener("click", function () {
  if (
    validateBookmarkName(bookmarNameInput) &&
    validateBookmarkName(websiteUrlInput) == true
  ) {
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    bookMarkes[updateIndex].SiteName = bookmarNameInput.value;
    bookMarkes[updateIndex].SiteUrl = websiteUrlInput.value;
    displayBookMark(bookMarkes);
    clearInput();
    localStorage.setItem("product", JSON.stringify(bookMarkes));
  } else {
    Swal.fire({
      title: "invalid data",
      text: "That thing is still around?",
      icon: "error",
    });
  }
});

function validateBookmarkName(element) {
  regex = {
    bookmarName: /^[a-zA-Z0-9\s]{1,50}$/,
    websiteUrl:
      /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
