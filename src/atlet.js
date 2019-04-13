var particles = [];
var amount = 0;
var mouse = { x: 0, y: 0 };
var radius = 1;
let canvas;
var ctx;
var ww;
var wh;

export function setup() {
  canvas = document.querySelector("#scene");
  ctx = canvas.getContext("2d");
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("touchmove", onTouchMove);
  window.addEventListener("touchend", onTouchEnd);
  initScene();
  requestAnimationFrame(render);
}

var colors = ["#0375aa", "#039be5"];

function Particle(x, y) {
  this.x = Math.random() * ww;
  this.y = Math.random() * wh;
  this.dest = {
    x: x,
    y: y
  };
  this.r = 1.3;
  this.vx = (Math.random() - 0.5) * 20;
  this.vy = (Math.random() - 0.5) * 20;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random() * 0.05 + 0.92;

  this.color = colors[Math.floor(Math.random() * 6)];
}

Particle.prototype.render = function() {
  this.accX = (this.dest.x - this.x) / 400;
  this.accY = (this.dest.y - this.y) / 400;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;

  if (Math.abs(this.vy) < 0.02) {
    this.vy *= 2;
  }
  if (Math.abs(this.vx) < 0.02) {
    this.vx *= 2;
  }

  this.x += this.vx;
  this.y += this.vy;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();

  var a = this.x - mouse.x;
  var b = this.y - mouse.y;

  var distance = Math.sqrt(a * a + b * b);
  if (distance < radius * 70) {
    this.accX = (this.x - mouse.x) / 10;
    this.accY = (this.y - mouse.y) / 10;
    this.vx += this.accX;
    this.vy += this.accY;
  }
};

function onMouseMove(e) {
  console.log("moving");
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e) {
  mouse.x = -9999;
  mouse.y = -9999;
}

function initScene() {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // To add text to the canvas use:
  // ctx.font = "650px Lobster";
  // ctx.textAlign = "center";
  // ctx.textBaseline = "middle";
  // ctx.fillText("Q", ww/2, wh/2);

  // Adding image to the canvas use:
  var img = new Image();
  img.width = 500;
  img.height = 700;
  img.onload = () => {
    ctx.drawImage(
      img,
      ww / 2 - img.width / 2,
      wh / 2 - img.height / 2,
      img.width,
      img.height
    );
    var data = ctx.getImageData(0, 0, ww, wh).data;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "screen";

    // Add some mobile compatibility
    // Lower == more pixels
    var pixelIntensity = 3;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(
        navigator.userAgent
      )
    ) {
      pixelIntensity = 12;
    }

    if (/MSIE|Edge/i.test(navigator.userAgent)) {
      pixelIntensity = 9;
    }

    particles = [];

    for (var i = 0; i < ww; i += pixelIntensity) {
      // Math.round(ww/300) bad ideea if your device has a small width and no processing - mobile
      for (var j = 0; j < wh; j += pixelIntensity) {
        if (data[(i + j * ww) * 4 + 3] > 150) {
          particles.push(new Particle(i, j));
        }
      }
    }
    amount = particles.length;
  };
  img.src = "/assets/images/africa2.svg";
}

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {
    particles[i].render();
  }
}

export const stop = () => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("touchmove", onTouchMove);
  window.removeEventListener("touchend", onTouchEnd);
};

// };
