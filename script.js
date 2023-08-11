

// contain api url and parameters
let url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=varanasi';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c5da3a5f43msh943d6938e45a922p11cf8fjsn6ca069f4df5d',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

// add eventlister to search button to serach input city weather
let form=document.getElementById('searchForm');
form.addEventListener('submit',getWeather);

// this give weather details
function getWeather(e){
    e.preventDefault();
    
    // store city name form searchspace
    let city_name=document.getElementById('searchInput').value

    // make city's first character in uppercase and rest in lowercase
    let city=city_name.charAt(0).toUpperCase()+city_name.slice(1).toLowerCase();

    // change the default url (i.e varanasi city) to given city
    url=`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;

    // request to fetch data from weather ninja api.
    getRequest(place=city);
   
}

async function getRequest(place='Varanasi'){
    try {
        // fetch api
        const response = await fetch(url, options);
        // convert response into json
        const result= await response.json();
        
        // storing some weather parameter for function assignClimateType()
        // because api do not provide climate type details so ,I provide  this functionality
        // using above parameters.
        let tempValue;
        let humidityValue;
        let cloud_pctValue;

        // provide values to each parameter in websites 
        Object.keys(result).forEach(key => {
            
            let element=document.getElementById(`${key}Value`);

            element.innerHTML=`${result[key]}`;

            // storing value for povide it as a paramters in assignClimateType() function
            if(key=='temp'){
                 tempValue=result[key];
            }

            if(key=='humidity'){
                humidityValue=result[key];
            }
            if(key=='cloud_pct'){
                cloud_pctValue=result[key];
            }
        });
        
        // function to assing diffenent climate types rainy,cloud ,sunny,cold.
        // change image and heading of main card accordingly.
        function assignClimateType(temp,humidity,cloud_pct){

            let climate=document.getElementById('climateType');
            let img=document.getElementById('imageClimate');

            if(temp<10){
                climate.innerHTML='Cold';
                img.setAttribute("src","snow_logo.png");
                img.setAttribute("alt","Cold");
            }
            else if(temp>15 && temp<30 && cloud_pct>85 && humidity>85){
                climate.innerHTML='Rainy';
                img.setAttribute("src","rain_logo.png");
                img.setAttribute("alt","Rainy");
            }
            else if(temp>10 && temp<35 && humidity<80 && cloud_pct>70){
                climate.innerHTML='Cloudy'
                img.setAttribute("src","cloud_logo.png");
                img.setAttribute("alt","Cloudy");
            }

            else{
                climate.innerHTML='Sunny';
                img.setAttribute("src","sunny_logo.png");
                img.setAttribute("alt","Sunny");
                
            }
        }
        assignClimateType(tempValue,humidityValue,cloud_pctValue);

        // changing location to given city 
        document.getElementById('locationCity').innerHTML=`${place}`;
        
    } catch (error) {
        alert("ERROR or May be invalid Input");
       
    }
}


getRequest();




// set a current date and time

const date=new Date();
document.getElementById('dateValue').innerHTML=date.toDateString();

//toogle a more detail option

let moreDetailButton=document.getElementById('moreDetailButton');

moreDetailButton.addEventListener('click',toogleMoreDetailDiv);
function toogleMoreDetailDiv(e){
    let elementDiv=document.getElementById('moreWeatherDetailBox');
   if(elementDiv.classList.contains('hideDiv')){
    elementDiv.classList.remove('hideDiv');
    elementDiv.classList.add('showDiv');
   
   }
   else{
    elementDiv.classList.add('hideDiv');
    elementDiv.classList.remove('showDiv');
   }
   
   let buttonToggle=document.getElementById('arrow');
   let buttonElement=document.getElementById('moreDetailButton');
   console.log(buttonElement);
   if(buttonToggle.classList.contains('downArrow')){
    buttonToggle.classList.add('upArrow');
    buttonToggle.classList.remove('downArrow');
   }
   else{
    buttonToggle.classList.add('downArrow');
    buttonElement.style.borderRadius='.5rem .5rem 0 0'
    buttonToggle.classList.remove('upArrow');
   }
}
