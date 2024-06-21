import './style.css';

async function getWeather(place) {    
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1cadc94424cb419a892105402242703&q=${place}&days=4`, {mode: 'cors'})
    let data = await response.json();
    let processedData = processData(data);
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
    let day1 = data.forecast.forecastday['1'].day.condition.text.toLowerCase();
    let day2 = data.forecast.forecastday['2'].day.condition.text.toLowerCase();
    // let day3 = data.forecast.forecastday['3'].day.condition.text.toLowerCase();
    let location = data.location.name;
    return { tempCel, tempFah, condition, day1, day2, location };
}

let unit = 'Celsius';
function displayData(data) {
    let body = document.querySelector('body');
    let con = document.querySelector('#con');
    let loc = document.querySelector('#loc');
    let temp = document.querySelector('#temp');
    let day1 = document.querySelector('#day1');
    let day2 = document.querySelector('#day2');
    // let day3 = document.querySelector('#day3');
    
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
    else {
        body.style.backgroundColor = '#000';
        con.style.color = 'white';
    }
    
    con.textContent = data.condition;
    loc.textContent = data.location;
    if (unit === 'Celsius') temp.textContent = data.tempCel;
    else temp.textContent = data.tempFah;

    day1.textContent = data.day1;
    day2.textContent = data.day2;
    // day3.textContent = data.day3;
}

let go = document.querySelector('#go');
go.addEventListener('click', () => {
    let tog = document.querySelector('#tog');
    let error = document.querySelector('#error');
    let input = document.querySelector('input');
    if (input.value) {
        error.textContent = '';
        tog.removeAttribute('disabled');
        getWeather(input.value);
    } else {
        error.textContent = 'Enter a value first';
    }
});
