let canvas = document.getElementById('jsCanvas');
let ctx = canvas.getContext('2d');
let colors = document.getElementById('jsColor');
let colorNum = document.getElementById('colorNum');
let range = document.getElementById('jsRange');
let mode = document.getElementById('jsMode');
let saveBtn = document.getElementById('jsSave');

// размер холста
let CANVAS_SIZE = 700;
canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

// значение по умолчанию
ctx.fillStyle = '#fff';
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.lineWidth = 2.5;
ctx.strokeStyle = '#000000';

// кист по умолчанию
let painting = false;
let filling = false;

// откл и вкл кист
const stopPainting = () => {
    painting = false;
}

const startPainting = () => {
    painting = true;
}

// начинает рисовать
const onMouseMove = (event) => {
    x = event.offsetX;
    y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

const onMouseDown = (event) => {
    painting = true;
}

// выбар светов
const hadleColorClick = (event) => {
    let color = event.target.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    colorNum.innerHTML = color;
}

// выбор жирности
const hendleRangeChange = (event) => {
    let rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
    console.log(event.target.value);
}

// переключение режимов
const hendleModeClick = () => {
    if (filling === true) {
        filling = false;
        mode.innerHTML = "Заливка";
    } else {
        filling = true;
        mode.innerHTML = "Рисование";
    }
}

const hendleCanvasClick = () => {
    if (filling) {
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

const hendleCM = (event) => {
    event.preventDefault();
}

const hendleSaveClick = () => {
    let image = canvas.toDataURL();
    let link = document.createElement('a');
    link.href = image;
    link.download = "PaintSite [Export]";
    link.click();
}

// canvas
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);
canvas.addEventListener('click', hendleCanvasClick);
canvas.addEventListener('contextmenu', hendleCM);

// color
colors.addEventListener('click', hadleColorClick);

// range
range.addEventListener('input', hendleRangeChange);

// mode
mode.addEventListener('click', hendleModeClick);

// save
saveBtn.addEventListener('click', hendleSaveClick)
