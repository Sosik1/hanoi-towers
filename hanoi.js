const TOWER_SIZE = 10;
const TOWER_WIDTH = 40;
const GAP_COEFF = 0.8;
const ELEMENT_SCALE = 0.9;
const ELEMENT_HEIGHT = 40;
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const X = [SCREEN_WIDTH / 6, SCREEN_WIDTH / 2, (5 * SCREEN_WIDTH) / 6]; //Wspolrzedne wiez

let display;

//Canvas - drawing and animation (View)
document.addEventListener("DOMContentLoaded", function () {
  display = setupCanvas();
  drawTowers(display);
  //Inicjalizujemy tablice i kolory
  dataInit();
  //Rsyjuemy elementy
  drawElements(display, a, 0);
});

document.querySelector("button").addEventListener("click", () => start());

//Model
let a = [];
let b = [];
let c = [];

//Controller
async function start() {
  instructions = [];
  iterator = 0;
  await hanoi(TOWER_SIZE, "A", "B", "C");
  console.log(instructions);
  printFromInstructions();
}

function move(fromName, toName) {
  let from = parseName(fromName);
  let to = parseName(toName);
  const element = from.pop();
  to.push(element);
  display.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  drawTowers(display);
  drawElements(display, a, 0);
  drawElements(display, b, 1);
  drawElements(display, c, 2);
}

let instructions = [];
const hanoi = async function (n, from, helper, to) {
  if (n === 0) return;
  hanoi(n - 1, from, to, helper);
  logMove(from, to);
  hanoi(n - 1, helper, from, to);
};

let iterator = 0;
function logMove(from, to) {
  instructions[iterator] = { from, to };
  iterator++;
}

let printIterator = 0;
function printFromInstructions() {
  if (printIterator < instructions.length) {
    move(instructions[printIterator].from, instructions[printIterator].to);
    setTimeout(printFromInstructions, 1000);
    printIterator++;
  }
}

function parseName(name) {
  switch (name) {
    case "A":
      return a;
      break;
    case "B":
      return b;
      break;
    case "C":
      return c;
      break;
    default:
      console.log("Wrong array name..");
      break;
  }
}

function setupCanvas() {
  const canvas = document.querySelector("canvas");
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
  const display = canvas.getContext("2d");
  return display;
}

function drawTowers(display) {
  const towerX = TOWER_WIDTH; //Szerokosc wiezy
  const towerY = (TOWER_SIZE + 1) * ELEMENT_HEIGHT; //Wysokosc wiezy

  display.strokeStyle = "#FFFFFF"; // Kolor obramowania wiezy
  for (let i = 0; i < X.length; i++) {
    // Rysujemy wieze
    display.strokeRect(
      X[i] - towerX / 2,
      SCREEN_HEIGHT - towerY,
      towerX,
      towerY
    );
  }
}

function drawElement(display, x, y, w, h) {
  display.beginPath();
  display.rect(x, y, w, h);
  display.stroke();
  display.fill();
}

function drawElements(display, elements, tower) {
  const maxElementWidth = (SCREEN_WIDTH / 3) * GAP_COEFF;
  let elementWidth;
  for (let i = 0; i < TOWER_SIZE; i++) {
    if (elements[i] != undefined) {
      elementWidth = maxElementWidth * ELEMENT_SCALE ** elements[i].size;
      display.strokeStyle = elements[i].color;
      display.strokeRect(
        X[tower] - elementWidth / 2,
        SCREEN_HEIGHT - (i + 1) * ELEMENT_HEIGHT,
        elementWidth,
        ELEMENT_HEIGHT
      );
    }
  }
}

function dataInit() {
  const colors = generateRainbowColors(10);
  for (let i = 0; i < TOWER_SIZE; i++) {
    a[i] = { color: colors[i], size: i };
  }
}
//Rainbow color function by gitHub user emrahgunduz

function generateRainbowColors(count) {
  function rainbow(numOfSteps, step) {
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch (i % 6) {
      case 0:
        r = 1;
        g = f;
        b = 0;
        break;
      case 1:
        r = q;
        g = 1;
        b = 0;
        break;
      case 2:
        r = 0;
        g = 1;
        b = f;
        break;
      case 3:
        r = 0;
        g = q;
        b = 1;
        break;
      case 4:
        r = f;
        g = 0;
        b = 1;
        break;
      case 5:
        r = 1;
        g = 0;
        b = q;
        break;
    }
    var c =
      "#" +
      ("00" + (~~(r * 255)).toString(16)).slice(-2) +
      ("00" + (~~(g * 255)).toString(16)).slice(-2) +
      ("00" + (~~(b * 255)).toString(16)).slice(-2);
    return c;
  }

  if (!count) count = 50;

  var ww = window.innerWidth;
  var w = Math.ceil(ww / 30);
  var x = 0;
  var y = 0;
  var colors = [];

  for (var i = 0; i < count; i++) {
    var color = rainbow(count, i);
    colors.push(color);
  }
  return colors;
}
