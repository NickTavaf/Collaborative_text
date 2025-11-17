const socket = io();
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let drawing = false;
let lastX, lastY;


canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => (drawing = false));

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const [x, y] = [e.offsetX, e.offsetY];
  drawLine(lastX, lastY, x, y, true);
  [lastX, lastY] = [x, y];
});

function drawLine(x1, y1, x2, y2, emit) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  //socket emits our draing data as a JSON object
  if (emit) socket.emit("draw", { x1, y1, x2, y2 });
}

//when socket receives "draw" event, it passes the JSON data to our drawLine function
socket.on("draw", ({ x1, y1, x2, y2 }) => drawLine(x1, y1, x2, y2, false));


const Clearbutton = document.getElementById("clear");

Clearbutton.addEventListener("click", () => {
    console.log("clear button clicked");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit("clear");
});



socket.on("clear", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
