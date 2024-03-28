import './style.css';
// 1cadc94424cb419a892105402242703
async function getWeather(place) {    
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1cadc94424cb419a892105402242703&q=${place}&days=3`, {mode: 'cors'})
    let data = await response.json();
    console.log(data);
    let processedData = processData(data);
    console.log(processedData);
    displayData(processedData);
    
    function toggleTemp() {
        unit = (unit === 'Celsius') ? 'Fahrenheit' : 'Celsius';
        let corf = document.querySelector('#corf');
        corf.textContent = unit;
        
        if (unit === 'Celsius') temp.textContent = processedData.tempCel;
        else temp.textContent = processedData.tempFah;
    }
    let tog = document.querySelector('#tog');
    tog.onclick = toggleTemp;
    
}

function processData(data) {
    let tempCel = data.current.temp_c;
    let tempFah = data.current.temp_f;
    let condition = data.current.condition.text.toLowerCase();
    let location = data.location.name;
    return { tempCel, tempFah, condition, location };
}

let unit = 'Celsius';
function displayData(data) {
    let body = document.querySelector('body');
    let con = document.querySelector('#con');
    let loc = document.querySelector('#loc');
    let temp = document.querySelector('#temp');
    
    if (data.condition.includes('rain')) {
        body.style.backgroundColor = '#C5E2F7';
        con.style.color = '#C5E2F7';
    }
    else if (data.condition.includes('cloud') || data.condition.includes('overcast')) {
        body.style.backgroundColor = 'gray';
        con.style.color = 'gray';
    }
    else if (data.condition.includes('sun')) {
        body.style.backgroundColor = 'orange';
        con.style.color = 'orange';
    }
    else body.style.backgroundColor = '#000';
    
    con.textContent = data.condition;
    loc.textContent = data.location;

    if (unit === 'Celsius') temp.textContent = data.tempCel;
    else temp.textContent = data.tempFah;    
}


let go = document.querySelector('#go');
go.addEventListener('click', () => {
    let tog = document.querySelector('#tog');
    tog.removeAttribute('disabled');
    let input = document.querySelector('input');
    getWeather(input.value);
});

