let inPut = document.getElementById("input");
let form = document.getElementById("form");
let post = document.querySelector(".right");
let empty = document.getElementById("empty");
let currentPost = null; // تخزين العنصر الذي يتم تحريره

console.log(post)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inPut.value.trim() !== "") {
        if (currentPost) {
            currentPost.parentElement.classList.remove("it-select-E")
            currentPost.innerText = inPut.value; // تحديث النص في نفس العنصر
            currentPost = null; // إعادة تعيين المتغير بعد التعديل
           
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
    newPost.innerHTML = `
        <p>${inPut.value}</p>
        <span class="icons">
            <i onclick="editPost(this)" class="fa-solid fa-pen-to-square"></i>
            <i onclick="removePost(this)" class="fa-solid fa-trash"></i>
        </span>
    `;
    post.appendChild(newPost);
    inPut.value = "";
}

function removePost(element) {
    element.parentElement.parentElement.remove(); // يحذف العنصر الصحيح
}

function editPost(element) {
    currentPost = element.parentElement.previousElementSibling; // تحديد البرجراف المطلوب تعديله
    inPut.value = currentPost.innerText; // وضع النص داخل حقل الإدخال
    let itSelectEtemes = currentPost.parentElement;
    itSelectEtemes.classList.add("it-select-E");
   
    inPut.focus(); // وضع التركيز على الإدخال
}
document.addEventListener("click", function(event) {
    if (event.target.tagName === "P") {
        event.target.classList.toggle("selected");
    }
});
