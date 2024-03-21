const canvas = document.querySelector("#playground");
const ctx = canvas.getContext("2d");

class Ball {
  constructor(x, y, diameter, color) {
    this.x = x;
    this.y = y;
    this.radius = diameter / 2;
    this.color = color;
    this.vx = 2;
    this.vy = 2;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= this.radius || this.x > 500 - this.radius) {
      this.vx *= -1;
    }
    if (this.y <= this.radius || this.y > 500 - this.radius) {
      this.vy *= -1;
    }
  }
}

class Paddle {
  constructor(color) {
    this.color = color;
    this.x = 20;
    this.y = 50;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, 20, 70);
    ctx.fill();
    ctx.closePath();
  }
  update() {}
}

const bal = new Ball(380, 10, 20, "yellow");
const paddle = new Paddle("red");
canvas.addEventListener("mousemove", function (e) {
  paddle.y = e.clientY - 35;
});

function hit() {
  return (
    bal.x - bal.radius <= paddle.x + 20 &&
    bal.y - bal.radius >= paddle.y &&
    bal.y + bal.radius * 2 <= paddle.y + 70
  );
}

function loop() {
  ctx.clearRect(0, 0, 500, 500);
  bal.draw();
  paddle.draw();
  if (hit()) {
    bal.vx *= -1;
    bal.vy *= -1;
  }
  bal.update();
  requestAnimationFrame(loop);
}

loop();
