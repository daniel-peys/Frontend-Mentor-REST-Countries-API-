const grid = document.querySelector('.cards');
const pageSizeSelect = document.querySelector('#page-size');
const filter = document.querySelector('#filter');
const arrowPageSize = document.querySelector('.select-wrapper:first-child img');
const arrowFilter = document.querySelector('.select-wrapper:not(:first-child) img');
const html = document.querySelector('html');
const searchBar = document.querySelector('.input-group input');

const cards = []

fetch('http://localhost:5000/api/countries')
  .then(response => response.json().then((item) => {
      item.forEach((country) => {
          cards.push(country);
          if(cards.length <= 10) {
            generateCountryCardDom(country);
          }
      })
  }));


function generateCountryCardTemplate(imgSource, name, population, region, capital) {
    return `
    <div class="card">
        <a href="./country-select.html?name=${name}">
        <img src=${imgSource} alt="country" />
        <div class="data-box">
            <h2>${name}</h2>
            <div class="data">
                <h3><span>Population:</span> ${population}</h3>
                <h3><span>Region:</span> ${region}</h3>
                <h3><span>Capital:</span>: ${capital}</h3>
            </div>
        </div>
        </a>
    </div>
    `
}

function generateCountryCardDom(country) {
    grid.innerHTML += generateCountryCardTemplate(country.flag, country.name, country.population, country.region, country.capital);
}


function changePageSize(number) {
    grid.innerHTML = "";
    if(number == "all") {
        number = cards.length;
    }
    if(filter.value == "All"){
        for(let i = 0; i < number; i++){
            generateCountryCardDom(cards[i]);
        }
    } else {
        filterContinent(filter.value);
    }
}


function filterContinent(continent) {
    if(continent == "All") {
        changePageSize(pageSizeSelect.value);
        return;
    }
    grid.innerHTML = "";
    let i = 0;
    for(let index = 0; index < cards.length; index++){
        if(cards[index].region == continent){
            if(pageSizeSelect.value != "All" && i == pageSizeSelect.value){
                break;
            }
            generateCountryCardDom(cards[index]);
            i++;
        }
    }
}


function rotateImg() {
    if(this.parentNode.children[0].style.transform == ""){
        this.parentNode.children[0].style.transform = "rotate(-90deg)";
    } else {
        this.parentNode.children[0].style.transform = "";
    }
}

let mouseOverFilter = false;
let mouseOverPageSize = false;


function setEvents() {
    pageSizeSelect.onchange = () => {
        changePageSize(pageSizeSelect.value);
    }
    filter.onchange = () => {
        filterContinent(filter.value);
    }

    filter.onclick = rotateImg;
    pageSizeSelect.onclick = rotateImg;

    filter.onmouseover = () => {
        mouseOverFilter = true;
    }
    filter.onmouseout = () => {
        mouseOverFilter = false;
    }

    pageSizeSelect.onmouseover = () => {
        mouseOverPageSize = true;
    }
    pageSizeSelect.onmouseout = () => {
        mouseOverPageSize = false;
    }

    html.onclick = () => {
       if(!mouseOverFilter) {
           arrowFilter.style.transform = "";
       }
       if(!mouseOverPageSize){
           arrowPageSize.style.transform = "";
       }
    }

    searchBar.onkeyup = () => {
        grid.innerHTML = "";
        let index = 0;
        
        for(let i = 0; i < cards.length; i++) {
            if(cards[i].name.toLowerCase()
            .includes(searchBar.value.toLowerCase()) && filter.value == "All"){
                if(index == pageSizeSelect.value){
                    break;
                }
                generateCountryCardDom(cards[i]);
                index++;
            } else if(cards[i].name.toLowerCase()
            .includes(searchBar.value.toLowerCase()) 
            && cards[i].region == filter.value) {
                if(index == pageSizeSelect.value){
                    break;
                }
                generateCountryCardDom(cards[i]);
                index++;
            }
        }
    }
}

setEvents();