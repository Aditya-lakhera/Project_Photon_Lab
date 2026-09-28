const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fileInput = document.getElementById('fileInput');

let img = new Image();
let sepia = false;
const brightnessInput = document.getElementById('brightness-input');
const contrastInput = document.getElementById('contrast-input');
const saturationInput = document.getElementById('saturation-input');
const blurInput = document.getElementById('blur-input');
const grayScaleBtn = document.getElementById('grayscale-btn');
const sepiaBtn = document.getElementById("sepia-btn");
const resetBtn = document.getElementById("reset-btn");
const downloadBtn=document.getElementById("download-btn");

fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if(!file) return;

    const reader = new FileReader(); //Web API that allows you to read the contents of files stored on the user's computer asynchronously, using File or Blob objects to specify the file or data to read.
    reader.onload = () => {
        img.src = reader.result;
    };
    reader.readAsDataURL(file);

    img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
        }
        resetCanvas();
}

function applyFilters(){
    const brightnessValue = brightnessInput.value;
    const contrastValue = contrastInput.value;
    const saturationValue = saturationInput.value;
    const blurValue = blurInput.value;
    const sepiaValue = sepia ? 100 : 0;

    
    ctx.filter =`brightness(${brightnessValue}%)
    contrast(${contrastValue}%)
    saturate(${saturationValue}%)
    blur(${blurValue}px)
    sepia(${sepiaValue}%)`;
    

    ctx.clearRect(0,0,canvas.width,canvas.hight);
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
}





function applyGrayScale()
{


    saturationInput.value=0;
    
   applyFilters();
}


function applySepiaEffect(){
    sepia = !sepia;
    if(sepia){
        sepiaBtn.style.backgroundColor="#F7E396";

    }
    else{
        sepiaBtn.style.backgroundColor="#607b8f";
    }
    applyFilters();


}

function resetCanvas(){
    brightnessInput.value = 100;
    contrastInput.value = 100;
    saturationInput.value = 100;
    blurInput.value = 0;
    sepia=false;
    sepiaBtn.style.backgroundColor="#607b8f";
    applyFilters();


}

function downloadCanvas(){
    const imageData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "Edited-img.png";
    link.href = imageData;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
}

brightnessInput.addEventListener("input",applyFilters)
contrastInput.addEventListener("input",applyFilters);
saturationInput.addEventListener("input",applyFilters);
blurInput.addEventListener("input",applyFilters);
grayScaleBtn.addEventListener("click",applyGrayScale);
sepiaBtn.addEventListener("click",applySepiaEffect);
resetBtn.addEventListener("click",resetCanvas);
downloadBtn.addEventListener("click",downloadCanvas);