const c = document.querySelector("#mycanvas");
// c.addEventListener("click", penTool); // fires after mouse left btn is released
c.addEventListener("mousedown", setLastCoords); //uses the setLastCoords function when mouse is pressed
c.addEventListener("mousemove", freeForm); //uses the freeForm function when mouse is moved
//this will make the program to get the coordinates of the mouse when it is pressed and the last coords of mouse's position
//the penTool function then draws a line from the place where mouse was pressed down to the mouse's last position.
//if not left button pressed then nothing happens (return).

const exportBtn = document.querySelector("#exportBtn");
const export64 = document.querySelector("#export64");
const clearBtn=document.querySelector("#clearBtn");

const exportBase64 = document.querySelector("#exportBase64");
const exportImage = document.querySelector("#exportImage");


const ctx = c.getContext("2d"); //creates canvas element


function setLastCoords(e) {
    const {x, y} = c.getBoundingClientRect(); 
    //by default returns the values of the position of the mouse relative to the 0,0 of the canvas
    lastX = e.clientX - x; //gives the x position of mouse 
    lastY = e.clientY - y; //gives the y position of mouse
}

function freeForm(e) {
    if (e.buttons !== 1) return; // left button is not pushed yet, if not pressed dont return anything
    penTool(e); //if pressed then use penTool function
}

function penTool(e) {
    const {x, y} = c.getBoundingClientRect();
    const newX = e.clientX - x;
    const newY = e.clientY - y;
    
    ctx.beginPath();
    ctx.lineWidth = 3; //line width
    ctx.moveTo(lastX, lastY); //start the shape from coords when mouse btn pressed
    ctx.lineTo(newX, newY); //draw line up to where mouse moved
    ctx.strokeStyle = 'black';
    ctx.stroke(); //draw the line
    ctx.closePath();
    
    lastX = newX; 
    lastY = newY;
}

//clear the canvas
clearBtn.addEventListener("click",e => {
    ctx.clearRect(0, 0, c.width, c.height);
    exportImage.innerHTML ="";
    exportBase64.innerHTML ="";
})


//exporting the image
exportBtn.addEventListener("click", e => {
    var dataURL = c.toDataURL('image/png');
    // console.log(dataURL);
    exportImage.innerHTML = `<img src="${dataURL}"/>`;
});

//exporting Base64 code
export64.addEventListener("click", e => {
    var dataURL = c.toDataURL('image/png');
    exportBase64.innerHTML = `<p id="base64Code"><code>${dataURL}</code></p>`;
});

