const root = document.getElementById("root")
root.innerHTML = `<p>Sök efter länder och städer</p>`
let cityIDArr = []



function showCountries(){
    root.innerHTML = ``

    fetch("./land.json")
    .then(res => res.json())
    .then(data => {
        
        //Rendering the countries to the DOM
        for( let country of data){
            root.innerHTML += `<p onClick="showCountryDetails(${country.id})" class="menu-btns">${country.countryname}</p>`
        }   
    })
}

function showCountryDetails(id){
    
    root.innerHTML = ``
    
    fetch("./stad.json")
    .then(res => res.json())
    .then(data => {
        
        //Rendering the cities to the DOM  
        for(let city of data){
            if(city.countryid === id){  
                root.innerHTML += `<p onClick="showCityDetails(${city.id}, '${city.stadname}', '${city.population}')" class="menu-btns">${city.stadname}</p>`
                   
            }   
        }
    })
}

function showCityDetails(id, name, population){  
    
    root.innerHTML = `
        <div class="city-details">
            <h3>${name}</h3>
            <p>Population: ${population}</p>
        </div>
            <button class="main-btn" onclick="addToVisitedCityList(${id}, '${name}', '${population}')">Besökt</button>
        `
}   
    
function addToVisitedCityList(id, name, population){
    //Saving City ID to array and localStorage
    //checking if city is NOT already added 
    if(!cityIDArr.includes(id)){

        cityIDArr.push(id)
        localStorage.setItem("cityIDArr", JSON.stringify(cityIDArr))
        console.log(JSON.parse(localStorage.getItem("cityIDArr")))
    }
}

function showVisitedCities(){
    let htmlStr = ``
    let totalPeopleMet = 0
    let parsedJSON = JSON.parse(localStorage.getItem("cityIDArr"))
    fetch("./stad.json")
    .then(res => res.json())
    .then(data => {

        if(parsedJSON){

            for(let i = 0; i < parsedJSON.length; i++){
                console.log(data[parsedJSON[i]-1].population)
                totalPeopleMet += data[parsedJSON[i]-1].population
                htmlStr +=`<li>${data[parsedJSON[i]-1].stadname}</li>`
            }
        }

        root.innerHTML = `
            <div>
                <h2>Besökta städer</h2>
                 ${htmlStr}
                <p>Antal personer du kan ha träffat: ${totalPeopleMet.toLocaleString('sv-SE')}</p>
                <button class="main-btn" onclick="clearStorage()"> clear storage </button>
            </div>`
    })
}

function clearStorage(){
    localStorage.clear()
    cityIDArr = []
    root.innerHTML = `
    <div>
        <h2>Besökta städer</h2>
        <p>Antal personer du kan ha träffat: 0</p>
        <button class="main-btn" onclick="clearStorage()"> clear storage </button>
    </div>`
}
