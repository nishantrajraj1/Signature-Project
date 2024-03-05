const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('touchstart', startDrawing);

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);

canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX || e.touches[0].clientX, e.offsetY || e.touches[0].clientY];
}

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const x = e.offsetX || e.touches[0].clientX;
    const y = e.offsetY || e.touches[0].clientY;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

function stopDrawing() {
    isDrawing = false;
}

document.getElementById('clearBtn').addEventListener('click', clearCanvas);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById('downloadBtn').addEventListener('click', downloadSignature);

function downloadSignature() {
    const dataUrl = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'signature.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
