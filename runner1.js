const canvas = document.getElementById("mycanvas");
const context = canvas.getContext("2d");

const g = 9.8;
const dt = 1;

const init_x = 0.1 * canvas.width;
const init_y = 0.9 * canvas.height;
let init_u_y = -45;

class Runner {
  constructor(x, y, thick, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.thick = thick;

    this.jumpSequence = false;

    window.addEventListener("keydown", this.keyDownHandler.bind(this), false);
  }

  keyDownHandler(event) {
    if ((event.key == "ArrowUp" || event.key == "Up") && !this.jumpSequence) {
      this.jump();
    }
  }

  jump() {
    this.jumpSequence = true;
    this.initiateJump();
  }

  initiateJump() {
    let u_y = init_u_y;
    let v_y = u_y + g * (dt / 1000);

    const interval = setInterval(() => {
        v_y += g * (dt / 1000);
        this.y += v_y * (dt / 1000);

        if (this.y >= init_y) {
            this.y = init_y;
            this.jumpSequence = false;
            //clearInterval(interval);
        }
    }, dt);
  }

  drawRunner() {
    context.beginPath();
    context.fillStyle = "green";
    context.rect(this.x, this.y - this.height, this.thick, this.height);
    context.fill();
    context.closePath();
  }
}

const mario = new Runner(init_x, init_y, 10, 10);

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    mario.drawRunner();
}

setInterval(draw, dt);
