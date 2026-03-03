import "./style.css";

const suits = [
  { cls: "heart", symbol: "♥" },
  { cls: "spade", symbol: "♠" },
  { cls: "club", symbol: "♣" },
  { cls: "diamond", symbol: "♦" }
];

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function r(max) {
  return Math.floor(Math.random() * max);
}

function $(id) {
  return document.getElementById(id);
}

function applySizeSafe() {
  const card = $("card");
  if (!card) return;

  const inputW = $("inputW");
  const inputH = $("inputH");

  const w = inputW ? Number(inputW.value) : NaN;
  const h = inputH ? Number(inputH.value) : NaN;

  const safeW = Number.isFinite(w) ? Math.max(120, w) : 420;
  const safeH = Number.isFinite(h) ? Math.max(160, h) : 640;

  card.style.width = safeW + "px";
  card.style.height = safeH + "px";
}

function renderRandomCardSafe() {
  const card = $("card");
  const topSuit = $("topSuit");
  const bottomSuit = $("bottomSuit");
  const valueEl = $("value");

  if (!card || !topSuit || !bottomSuit || !valueEl) {
    console.error("Faltan IDs en el HTML. Deben existir: card, topSuit, bottomSuit, value");
    return;
  }

  const suit = suits[r(suits.length)];
  const value = values[r(values.length)];

  topSuit.textContent = suit.symbol;
  bottomSuit.textContent = suit.symbol;
  valueEl.textContent = value;

  card.classList.remove("heart", "spade", "club", "diamond");
  card.classList.add(suit.cls);
}

function generate() {
  applySizeSafe();
  renderRandomCardSafe();
}

let intervalId = null;

function startAuto() {
  stopAuto();
  intervalId = setInterval(generate, 3000);
}

function stopAuto() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

window.onload = () => {
  generate();

  const btn = $("btnNew");
  if (btn) btn.addEventListener("click", generate);

  const iw = $("inputW");
  const ih = $("inputH");
  if (iw) iw.addEventListener("input", applySizeSafe);
  if (ih) ih.addEventListener("input", applySizeSafe);

  const toggle = $("autoToggle");
  if (toggle) {
    toggle.addEventListener("change", () => {
      if (toggle.checked) startAuto();
      else stopAuto();
    });

    if (toggle.checked) startAuto();
    else stopAuto();
  } else {
    startAuto();
  }
};