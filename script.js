const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fileInput = document.getElementById('fileInput');

const img = new Image();
// const brightnessInput = document.getElementById('brightness-input');
// const contrastInput = document.getElementById('contrast-input');
// const saturationInput = document.getElementById('saturation-input');
// const blurInput = document.getElementById('blur-input');

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
}


