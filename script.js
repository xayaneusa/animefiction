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
  return `./MikasaT/(${index + 1}).png`;
}

const frameCount = 96;
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

  const desiredHeight = canvas.height * 0.89; // 80% of window height (adjustable)
  const scale = desiredHeight / img.height;  // shrink based on height

  const imgWidth = img.width * scale;
  const imgHeight = img.height * scale;

  const offsetX = 150; // Move 190px to the left if you want
  const centerShift_x = (canvas.width - imgWidth) / 2 - offsetX;
  const bottomShift_y = canvas.height - imgHeight; // Anchor at bottom

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    bottomShift_y,
    imgWidth,
    imgHeight
  );
}
