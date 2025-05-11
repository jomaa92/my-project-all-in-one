const inputBox = document.getElementById("input-Box");
const listContainer = document.getElementById("list-Container");

function addTask() {

    if (inputBox.value === "") {
        alert("write something");
    }
    else {
        let LI = document.createElement("li");
        LI.innerHTML = inputBox.value;
        listContainer.appendChild(LI);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        LI.appendChild(span);
    }

    inputBox.value = "";
    saveDate();

}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checkBtn");
        saveDate();
    }
    else if (e.target.tagName === "SPAN") {

        e.target.parentElement.remove();
        saveDate();

    }
}, false);

function saveDate() {
    localStorage.setItem("date", listContainer.innerHTML);
    console.log(localStorage)

}
function showDate() {

    listContainer.innerHTML = localStorage.getItem("date");


}
showDate();