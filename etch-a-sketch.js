let size = 16;
const grid_container = document.getElementById('grid-container');

const DEFAULT_COLOUR = 'White';

let currentColour = 'Black';
let currentMode = 'colour';

let colourPicker = document.getElementById('colour-picker');
let colourButton = document.getElementById('colour-button');
let eraseButton = document.getElementById('erase-button');
let clearButton = document.getElementById('clear-button');
let sizeText = document.getElementById('size-text');
let sizeSlider = document.getElementById('size-slider');

colourPicker.onchange = () => setCurrentColour(colourPicker.value);
colourButton.onclick = () => setCurrentMode('colour');
eraseButton.onclick = () => setCurrentMode('erase');
clearButton.onclick = () => reloadGrid();
sizeSlider.onchange = () => resetGrid(sizeSlider.value);
sizeSlider.onmousemove = () => changeSizeText(sizeSlider.value);


function initGrid(s)
{
    if(grid_container == null)
    {
        console.error("Grid container is null");
        return;
    }

    grid_container.style.setProperty('--size', s);
    for(c = 0; c < s*s; c++)
    {
        let cell = document.createElement("div");
        grid_container.appendChild(cell).className = "grid-item";
        cell.style.backgroundColor = 'White';
        cell.addEventListener('mouseover', changeColour);
    }
}

function resetGrid(newSize)
{
    size = newSize;
    deleteGrid();
    initGrid(size);
}

function changeSizeText(newSize)
{
    sizeText.innerHTML = newSize + ' x ' + newSize;
}

function deleteGrid()
{
    if(grid_container == null)
    {
        console.error("Grid container is null");
        return;
    }

    let cells = document.getElementsByClassName('grid-item');
    for(let c = 0; c < cells.length; c++)
    {
        // Feel like this isn't right
        cells[c].remove();
        cells[c].style.backgroundColor = 'White';
    }
}

function setCurrentColour(colour)
{
    currentColour = colour;
}

function setCurrentMode(mode)
{
    currentMode = mode;
    changeActiveButton(currentMode);
}

function changeActiveButton(mode)
{
    switch(mode)
    {
        case 'colour':
            colourButton.classList.add('active-button')
            eraseButton.classList.remove('active-button');
            break;
        case 'erase':
            eraseButton.classList.add('active-button');
            colourButton.classList.remove('active-button')
            break;
    }

    console.log('logged');
}

function reloadGrid()
{
    let items = document.getElementsByClassName('grid-item');

    for(let i = 0; i < items.length; i++)
        items[i].style.backgroundColor = 'White';
}

function changeColour(e)
{
    switch(currentMode)
    {
        case 'colour':
            e.target.style.backgroundColor = currentColour;
            break;
        case 'erase':
            e.target.style.backgroundColor = 'White';
            break;
    }
} 

window.onload = () =>
{
    initGrid(size);
    changeActiveButton('colour');
}
