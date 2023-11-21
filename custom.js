const result = document.querySelector('.result');
const resultt = document.querySelector('.resultt');
const form = document.querySelector('.get-weather');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if ( nameCountry.value === '') {
        showError('Por favor ponga el pais');
        return
    }

    weather(nameCountry.value);
    imgflags(nameCountry.value);
 
})




function weather(nameCountry){
    const apiId = 'e2e756d7938f5d0bdda519ac0bc8f93b';
    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${nameCountry}&appid=${apiId}`  ) 
  
.then(data =>{return data.json()} )
        .then(jsonData => {
            if (jsonData.cod === '404') {
                showError('Clima del pain no encontrado...');
            } else {
                result.innerHTML = '';
                countryclimate(jsonData);
            }
            //console.log(jsonData);
        })
        
}


async function imgflags(nameCountry){
   const response= await fetch(`https://restcountries.com/v3.1/name/${nameCountry}`)
   const data = await response.json()
   //console.log(data)
   if (data === '404') {
    showError('Bandera no encontrada...');
} else {
    resultt.innerHTML = '';
    flags(data);
}


     }
    

     //Desplegar la bandera dependiendo del pais donde se consulte el clima
     function flags(flagsData){
    
        const displayflags = document.createElement('div');
        displayflags.innerHTML = `
            <img src="${flagsData[0].flags.png}">
        `;
    
        resultt.appendChild(displayflags);
    }
 

    // desplegar la informacion de los datos del clima dependiendo del pais
function countryclimate(jsonData){
    const {weather:[arr]} = jsonData;
const temper= Math.round(jsonData.main.temp-273.15) 
const temp_maxx= Math.round(jsonData.main.temp_max-273.15) 
const temp_minn= Math.round(jsonData.main.temp_min-273.15) 


    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${jsonData.name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${temper}°C</h2>
        <p>Max: ${temp_maxx}°C</p>
        <p>Min: ${temp_minn}°C</p>

    `;

    result.appendChild(content);
}

function showError(message){
    //console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}
