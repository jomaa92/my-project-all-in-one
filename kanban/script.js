let inPut = document.getElementById("input");
let form = document.getElementById("form");
let post = document.querySelector(".right");
let empty = document.getElementById("empty");
let currentPost = null; // العنصر الذي يتم تعديله
let draggedItem = null; // العنصر الذي يتم سحبه

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inPut.value.trim() !== "") {
    if (currentPost) {
      currentPost.parentElement.classList.remove("it-select-E");
      currentPost.innerText = inPut.value;
      currentPost = null;
    } else {
      createPost();
    }
    inPut.value = "";
    empty.innerHTML = "";
  } else {
    empty.innerHTML = "Please write something";
  }
});

function createPost() {
  let newPost = document.createElement("div");
  newPost.setAttribute("draggable", "true");
  newPost.classList.add("post-item");

  newPost.innerHTML = `
    <p>${inPut.value}</p>
    <span class="icons">
      <i onclick="editPost(this)" class="fa-solid fa-pen-to-square"></i>
      <i onclick="removePost(this)" class="fa-solid fa-trash"></i>
    </span>
  `;

  // أحداث السحب
  newPost.addEventListener("dragstart", handleDragStart);
  newPost.addEventListener("dragover", handleDragOver);
  newPost.addEventListener("drop", handleDrop);
  newPost.addEventListener("dragleave", handleDragLeave); // 🆕
  newPost.addEventListener("dragend", handleDragEnd);

  post.appendChild(newPost);
  inPut.value = "";
}

function removePost(element) {
  element.parentElement.parentElement.remove();
}

function editPost(element) {
  // إزالة التأثير من كل العناصر الأخرى
  document.querySelectorAll(".it-select-E").forEach((item) => {
    item.classList.remove("it-select-E");
  });

  let paragraph = element.parentElement.previousElementSibling;
  let postContainer = paragraph.parentElement;

  if (!paragraph.classList.contains("selected")) {
    currentPost = paragraph;
    inPut.value = currentPost.innerText;
    postContainer.classList.add("it-select-E");
    inPut.focus();
  } else {
    paragraph.classList.add("selected");
  }
}

document.addEventListener("click", function (event) {
  if (event.target.tagName === "P") {
    event.target.classList.toggle("selected");
  }
});

// ✅ أحداث Drag and Drop

function handleDragStart(e) {
  draggedItem = this;
  this.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  if (this !== draggedItem) {
    this.classList.add("drag-over");
  }
}

function handleDrop(e) {
  e.preventDefault();
  this.classList.remove("drag-over");

  if (this !== draggedItem) {
    const allPosts = [...post.querySelectorAll(".post-item")];
    const dropIndex = allPosts.indexOf(this);
    const dragIndex = allPosts.indexOf(draggedItem);

    if (dragIndex < dropIndex) {
      this.after(draggedItem);
    } else {
      this.before(draggedItem);
    }
  }
}

function handleDragLeave(e) {
  this.classList.remove("drag-over"); // ⬅️ يزيل التأثير عند مغادرة العنصر
}

function handleDragEnd() {
  this.classList.remove("dragging");
  document.querySelectorAll(".drag-over").forEach((el) => {
    el.classList.remove("drag-over");
  });
}
