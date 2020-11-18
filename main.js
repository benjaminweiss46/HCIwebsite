const html = document.documentElement;
const canvas = document.getElementById('scrolling');
const context = canvas.getContext('2d');

const curFrame = index => (
    `scroll/frame-000${index.toString().padStart(3, '0')}.jpg`
)

const frameCount = 120;

const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = curFrame(i);
    }
};

const img = new Image();

img.src = curFrame(1);
canvas.height = 1080;
canvas.width = 1920;

img.onload = function () {
    context.drawImage(img, 0, 0)
}
const updateImage = index => {
    img.src = curFrame(index)
    context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {
    const scrollTop = html.scrollTop;
    const maxScroll = html.scrollHeight = window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;
    const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));

    requestAnimationFrame(() => updateImage(frameIndex));
});

document.body.addEventListener('click', () => {
    window.location = "index.html";
}, true); 

preloadImages();