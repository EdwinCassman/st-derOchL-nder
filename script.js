const root = document.getElementById("root")
let totalPeopleMet = 0
let formattedNumber
root.innerHTML = `<p>Sök efter länder och städer</p>`


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
                root.innerHTML += `<p onClick="showCityDetails(${city.id})" class="menu-btns">${city.stadname}</p>`
                   
            }   
        }
    })
}


function showCityDetails(id){  
    
    fetch("./stad.json")
    .then(res => res.json())
    .then(data => {
        
        //Rendering details of specific city
        for(let city of data){
            if(city.id === id){        
                root.innerHTML = `<div class="city-details">
                <h3>${city.stadname}</h3>
                <p>Population: ${city.population}</p>
                </div>
                <button class="main-btn" onclick="addToVisitedCityList(${id}, '${city.stadname}', '${city.population}')">Besökt</button>
                `
            }   
        } 
    })
    
}

//Dealing with localStorage logic
function addToVisitedCityList(id, name, population){
    //checking if specific city is NOT already in local storage
    if(!localStorage.getItem(id)){
        localStorage.setItem(id, name)
        localStorage.setItem("pop", population)
        
        //turning localStorage data into number and dealing with math logic
        totalPeopleMet += Number(localStorage.getItem("pop"))
        localStorage.setItem("totalMet", totalPeopleMet)
        console.log(Number(localStorage.getItem("totalMet")).toLocaleString('sv-SE'))
    } 
}


function showVisitedCities(){
    let htmlStr = ""
    
    //looping through the cities to see if they have been added to the list
    for(let i = 1; i < 16; i++){
        if(localStorage.getItem(i) === null){
            htmlStr += ``
        } else {
            
            htmlStr += `<li>${localStorage.getItem(i)}</li>`
        }
        
    }
    
    //Rendering those cities to its page, making sure numbers of population is readable.
    if(localStorage.getItem("totalMet") === null){

    }else{
        root.innerHTML = `
        <div>
            <h2>Visited Cities</h2>
                ${htmlStr}
            <p>Antal personer du kan ha träffat: ${Number(localStorage.getItem("totalMet")).toLocaleString('sv-SE')}</p>
            <button class="main-btn" onclick="clearStorage()"> clear storage </button<
        </div>`
    }
}

//Clearing storage.
function clearStorage(){
    localStorage.clear()
    root.innerHTML = `
    <div>
        <h2>Visited Cities</h2>
    </div>`
}