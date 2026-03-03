// ===============================
// Estado e armazenamento
// ===============================
console.log('script loaded');
const STORAGE_KEY = "crud_vr_boxes";

let boxesData = [];
let selectedId = null; // id of currently selected box

// ===============================
// Utilidades de LocalStorage
// ===============================
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(boxesData));
}

function loadData() {
  const data = localStorage.getItem(STORAGE_KEY);
  boxesData = data ? JSON.parse(data) : [];
  // normalize any old hex colors to names when possible
  boxesData = boxesData.map(item => {
    const name = colorName(item.color);
    if (name && name !== item.color) {
      // if colorName returned a friendly name, update item
      item.color = name;
    }
    return item;
  });
}

// ===============================
// CRUD (conceitual HTTP)
// ===============================

// POST → Create
function createItem() {
  console.log('createItem called');
  const newItem = {
    id: Date.now(),
    color: getRandomColor(),
    position: {
      x: boxesData.length * 2 - 2,
      y: 0.5,
      z: 0
    }
  };

  boxesData.push(newItem);
  saveData();
  renderScene();
}

// GET → Read
function getItems() {
  return boxesData;
}

// PUT → Update
function updateItem() {
  console.log('updateItem called');
  if (boxesData.length === 0) return;
  // update selected box if any, otherwise update last
  if (selectedId) {
    const idx = boxesData.findIndex(b => b.id === selectedId);
    if (idx !== -1) {
      boxesData[idx].color = getRandomColor();
    }
  } else {
    const last = boxesData[boxesData.length - 1];
    last.color = getRandomColor();
  }

  saveData();
  renderScene();
}

// DELETE → Delete
function deleteItem() {
  console.log('deleteItem called');
  if (boxesData.length === 0) return;
  // delete selected if exists, otherwise delete last
  if (selectedId) {
    const idx = boxesData.findIndex(b => b.id === selectedId);
    if (idx !== -1) {
      boxesData.splice(idx, 1);
      selectedId = null;
    }
  } else {
    boxesData.pop();
  }
  saveData();
  renderScene();
}

// ===============================
// Renderização VR
// ===============================
function renderScene() {
  const scene = document.querySelector("a-scene");
  if (!scene) return;

  // remove boxes antigas
  const oldBoxes = scene.querySelectorAll(".dynamic-box");
  oldBoxes.forEach(el => el.remove());

  // recalcula posições com base no índice para evitar buracos
  getItems().forEach((item, index) => {
    // compute canonical position
    const px = index * 2 - 2;
    const py = item.position?.y ?? 0.5;
    const pz = item.position?.z ?? 0;

    // update stored position so next load preserves layout
    item.position = { x: px, y: 0.5, z: pz };

    const box = document.createElement("a-box");
    box.classList.add("dynamic-box");
    box.setAttribute('id', `box-${item.id}`);
    box.dataset.id = item.id;
    box.setAttribute("position", `${item.position.x} ${item.position.y} ${item.position.z}`);
    box.setAttribute("color", item.color);
    // highlight selected
    if (selectedId === item.id) {
      box.setAttribute('scale', '1.2 1.2 1.2');
      box.setAttribute('opacity', '0.9');
    } else {
      box.setAttribute('scale', '1 1 1');
      box.removeAttribute('opacity');
    }
    // selection handler
    box.addEventListener('click', (ev) => {
      ev.stopPropagation();
      selectBox(item.id);
    });
    scene.appendChild(box);
  });

  // persist updated positions to avoid gaps after reload
  saveData();

  // click on ground / scene to deselect
  const ground = scene.querySelector('a-plane');
  if (ground) {
    ground.addEventListener('click', (ev) => {
      // only deselect when clicking the ground plane, not boxes
      ev.stopPropagation();
      selectedId = null;
      renderScene();
    });
  }
}

// select a box by id
function selectBox(id) {
  selectedId = id;
  console.log('selected box', id);
  renderScene();
}

// ===============================
// Botões (HTML e VR)
// ===============================
// HTML controls (still present for desktop use)
document.getElementById("btnCreate")?.addEventListener("click", createItem);
document.getElementById("btnUpdate")?.addEventListener("click", updateItem);
document.getElementById("btnDelete")?.addEventListener("click", deleteItem);
document.getElementById("btnRead")?.addEventListener("click", showHistoryVR);

// VR planes
["vrCreate", "vrUpdate", "vrDelete", "vrRead"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('clickable');
    el.addEventListener('click', () => {
      switch(id) {
        case 'vrCreate': createItem(); break;
        case 'vrUpdate': updateItem(); break;
        case 'vrDelete': deleteItem(); break;
        case 'vrRead': showHistoryVR(); break;
      }
    });
    el.addEventListener('mouseenter', () => el.setAttribute('color','#6aa992'));
    el.addEventListener('mouseleave', () => el.setAttribute('color','#7BC8A4'));
  }
});

// ===============================
// Inicialização (IMPORTANTE)
// ===============================
// ===============================
// Utils
// ===============================
// list of friendly colors for boxes
const COLOR_MAP = {
  red: "#ff0000",
  blue: "#0000ff",
  green: "#00ff00",
  yellow: "#ffff00",
  purple: "#800080",
  orange: "#ffa500",
  pink: "#ffc0cb",
  cyan: "#00ffff",
  lime: "#00ff00",
  magenta: "#ff00ff",
  teal: "#008080",
  navy: "#000080",
  olive: "#808000",
  maroon: "#800000",
  silver: "#c0c0c0",
  gray: "#808080"
};

function getRandomColor() {
  // pick a random key from COLOR_MAP
  const keys = Object.keys(COLOR_MAP);
  return keys[Math.floor(Math.random() * keys.length)];
}

// given a stored color (name or hex), return a readable name
function colorName(col) {
  if (!col) return "unknown";
  // if it's already a name in map
  if (COLOR_MAP[col]) return col;

  // attempt to interpret as hex string
  const hexMatch = /^#([0-9a-fA-F]{6})$/.exec(col);
  if (hexMatch) {
    // try exact reverse lookup
    const exact = Object.keys(COLOR_MAP).find(
      k => COLOR_MAP[k].toLowerCase() === col.toLowerCase()
    );
    if (exact) return exact;

    // compute nearest named color by Euclidean distance in RGB space
    const r = parseInt(col.substr(1, 2), 16);
    const g = parseInt(col.substr(3, 2), 16);
    const b = parseInt(col.substr(5, 2), 16);

    let nearest = null;
    let minDist = Infinity;
    for (const [name, hex] of Object.entries(COLOR_MAP)) {
      const rr = parseInt(hex.substr(1, 2), 16);
      const gg = parseInt(hex.substr(3, 2), 16);
      const bb = parseInt(hex.substr(5, 2), 16);
      const dist = (r - rr) ** 2 + (g - gg) ** 2 + (b - bb) ** 2;
      if (dist < minDist) {
        minDist = dist;
        nearest = name;
      }
    }
    // threshold for "close enough" (about 100^2 per channel)
    if (minDist < 10000 && nearest) {
      return nearest;
    }
    // fallback: indicate custom hex
    return col;
  }

  return col;
}

// ===============================
// Inicialização (IMPORTANTE)
// ===============================
loadData();
renderScene();

function showHistory() {
  const items = getItems();

  if (items.length === 0) {
    alert("Nenhum cubo cadastrado.");
    return;
  }

  let msg = "📦 Histórico de cubos:\n\n";

  items.forEach((item, index) => {
    msg += `#${index + 1}\n`;
    msg += `ID: ${item.id}\n`;
    msg += `Cor: ${colorName(item.color)}\n`;
    msg += `Posição: (${item.position.x}, ${item.position.y}, ${item.position.z})\n\n`;
  });

  alert(msg);
}

function showHistoryVR() {
  console.log('showHistoryVR called');
  const panel = document.getElementById("historyPanel");
  const text = document.getElementById("historyText");

  const items = getItems();

  if (items.length === 0) {
    text.setAttribute("value", "Nenhum cubo cadastrado.");
    panel.setAttribute("visible", "true");
    return;
  }

  let msg = "Histórico de Cubos:\n\n";

  // mostrar apenas índice (posição na lista) e cor
  items.slice(-8).forEach((item, index) => {
    msg += `#${index + 1} | ${colorName(item.color)}\n`;
  });

  text.setAttribute("value", msg);
  panel.setAttribute("visible", "true");
}