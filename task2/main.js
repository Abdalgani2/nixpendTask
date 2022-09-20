const body = document.querySelector("body");
const main = document.getElementById('main');

// SECOND NAV BAR
const nav = document.createElement('div');
nav.innerHTML = `<nav class="w-80 p-3 navbar bg-light secondNav"  id="nav">
<div class="container-fluid">
    <div class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search">
        <button class="btn btn-outline-success"  onclick="search()">Search</button>
      </div>
      <select name="etat" id="mySel" onChange="filter()">
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
</div>
</nav> `

// DARK MODE FUNCTION 
function darkMode() {
    var element = document.body;
    document.getElementById('mainNav').classList.toggle("navBar-dark-mode")
    document.getElementById('nav').classList.toggle("dark-mode")
    element.classList.toggle("dark-mode");
    var buttons = document.getElementsByClassName('Country');
    console.log(buttons[0]);
    for (var i = 0; i < buttons.length; i++) {

        buttons[i].classList.toggle("Country-dark-mode");
    }
}

//  DISPLAY ALL COUNTRIES IN MAIN PAGE FUNCTION
function displayCountries() {
    nav.innerHTML = `<nav class="w-80 p-3 navbar bg-light secondNav"  id="nav">
<div class="container-fluid">
    <div class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search">
        <button class="btn btn-outline-success"  onclick="search()">Search</button>
      </div>
      <select name="etat" id="mySel" onChange="filter()">
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
</div>
</nav> `
    document.getElementById("nav").append(nav)
    fetch('https://restcountries.com/v2/all').then(res => res.json()).then(data => {
        data.forEach(Country => {
            const CountryEl = document.createElement('div');
            CountryEl.classList.add('Country');
            CountryEl.innerHTML = `
            <div id="${Country.name}">
                 <img src="${Country.flags.svg}" alt="${Country.name}">
                <div class="Country-info">
                    <h5>${Country.name}</h5>
                    <p>population: ${Country.population}</p>
                    <p>Region: ${Country.region}</p>
                    <p>capital: ${Country.capital}</p>
                </div>
                <div> `

            main.append(CountryEl);
            var el = document.getElementById(`${Country.name}`);
            console.log("el", el);
            if (el) {
                el.addEventListener('click', () => {
                    moreDetaels(Country)
                })
            }
        })
    })
}
displayCountries()

// MORE DETALES FUNCTION
function moreDetaels(data) {
    nav.innerHTML = ''
    main.innerHTML = '';
    const movieEl = document.createElement('div');
    movieEl.innerHTML = `
    <div class = "detales" id="${data.name}">
    <div>
     <img src="${data.flags.svg}" alt="${data.name}"></div>
        <div class="movie-info">
            <h5>${data.name}</h5>
            <p>population: ${data.population}</p>
            <p>Region: ${data.region}</p>
            <p>capital: ${data.capital}</p>
        </div>
        <div class="movie-info">
            <p>${data.name}</p>
            <p>population: ${data.population}</p>
            <p>Region: ${data.region}</p>
            <p>capital: ${data.capital}</p>
        </div>
        <button id='back'>Back <button>
        <div> 
        `
    body.append(movieEl)
    document.getElementById("back").addEventListener('click', () => {
        movieEl.innerHTML = ""
        displayCountries()

    })
}

// SEARCH FUNCTION
function search() {
    let name = document.getElementById("search").value
    main.innerHTML = '';
    fetch(`https://restcountries.com/v3.1/name/${name}`).then(res => res.json()).then(data => {
        var el = document.getElementById("search");

        if (el) {
            document.getElementById("search").remove();
        }
        console.log(data);
        console.log("data", data[0].name.common);
        main.innerHTML = '';
        const movieEl = document.createElement('div');
        movieEl.innerHTML = `
    <div class = "detales" id="${data[0].name.common}">
         <img src="${data[0].flags.svg}" alt="${data[0].common}">
        <div class="movie-info">
            <h2>${data[0].name.common}</h2>
            <h5>population: ${data[0].population}</h5>
            <h5>Region: ${data[0].region}</h5>
            <h5>capital: ${data[0].capital}</h5>
        </div>
        <div class="movie-info">
            <h2>${data[0].common}</h2>
            <h5>population: ${data[0].population}</h5>
            <h5>Region: ${data[0].region}</h5>
            <h5>capital: ${data[0].capital}</h5>
        </div>
        <div> `
        body.append(movieEl)
        var el = document.getElementById(`${data[0].name}`);

        if (el) {
            el.addEventListener('click', () => {
                console.log(Country.name)
                moreDetaels(Country)
            })
        }
    })

}

//FILTER FUNCTION
function filter() {
    console.log(document.getElementById('mySel').value)
    main.innerHTML = '';
    document.getElementById("nav").append(nav)
    fetch(`https://restcountries.com/v3.1/region/${document.getElementById('mySel').value}`).then(res => res.json()).then(data => {
        data.forEach(Country => {
            const CountryEl = document.createElement('div');
            CountryEl.classList.add('Country');
            CountryEl.innerHTML = `
                <div id="${Country.name}">
                     <img src="${Country.flags.svg}" alt="${Country.name}">
                    <div class="Country-info">
                        <h5>${Country.name}</h5>
                        <p>population: ${Country.population}</p>
                        <p>Region: ${Country.region}</p>
                        <p>capital: ${Country.capital}</p>
                    </div>
                    <div> `
            main.append(CountryEl);
            var el = document.getElementById(`${Country.name}`);
            console.log("el", el);
            if (el) {
                el.addEventListener('click', () => {
                    moreDetaels(Country)
                })
            }
        })
    })

}

