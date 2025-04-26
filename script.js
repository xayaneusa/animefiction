const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  return `./Mikasa/(${index + 1}).png`;
}

const frameCount = 98;
const images = [];
const imageSeq = {
  frame: 0,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

images[0].onload = render;

let currentFrame = 0;
const fps = 30;
const frameDuration = 1000 / fps;

const playAnimation = setInterval(() => {
  if (currentFrame < frameCount) {
    imageSeq.frame = currentFrame;
    render();
    currentFrame++;
  } else {
    currentFrame = 0; // Loop the animation
  }
}, frameDuration);

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  const canvas = ctx.canvas;
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.max(hRatio, vRatio);
  const offsetX = 190; // move 50 pixels left
  const offsetY = 0;  // you can also move up/down if you want
  const centerShift_x = (canvas.width - img.width * ratio) / 2 - offsetX;
  const centerShift_y = (canvas.height - img.height * ratio) / 2 + offsetY;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
