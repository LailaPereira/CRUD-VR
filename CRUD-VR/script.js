let boxCount = 0;
let boxes = [];

// buttons are already present when this script is loaded at the end of the
// document, so we can wire them up immediately. the previous
// DOMContentLoaded listener never fired because the event had already
// occurred by the time the script ran.


const btnCreate = document.getElementById("btnCreate");
const btnUpdate = document.getElementById("btnUpdate");
const btnDelete = document.getElementById("btnDelete");


if (btnCreate) btnCreate.addEventListener("click", createBox);
if (btnUpdate) btnUpdate.addEventListener("click", updateBox);
if (btnDelete) btnDelete.addEventListener("click", deleteBox);


function createBox() {
    const scene = document.querySelector("a-scene");
    if (!scene) {
        console.error('a-scene not found in DOM');
        return;
    }

    const box = document.createElement("a-box");
    box.setAttribute("position", `${boxCount * 2 - 2} 1 0`);
    box.setAttribute("color", "blue");

    scene.appendChild(box);

    boxes.push(box);
    boxCount++;
}

function updateBox() {
    if (boxes.length === 0) return;

    const lastBox = boxes[boxes.length - 1];
    lastBox.setAttribute("color", getRandomColor());
}

function deleteBox() {
    if (boxes.length === 0) return;

    const lastBox = boxes.pop();
    lastBox.remove();
}

function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}