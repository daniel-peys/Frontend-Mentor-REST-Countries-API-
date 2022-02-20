const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors());

app.listen(5000, () => {
    console.log("Server is whitsling on port 5000...");
}) 

// Get all countries
app.get('/api/countries', (req, res) => {
    axios.get('https://restcountries.com/v3.1/all')
    .then((response) => {
        res.status(200).send(JSON.stringify(genereateResponse(response)));
    })
    .catch((error) => {
        res.status(404).send("<h1> 404 Error </h1>");
        console.log(error);
    })
})

// Get specific country
app.get('/api/countries/:country', (req, res) => {
    axios.get(`https://restcountries.com/v3.1/name/${req.params.country}`)
    .then((response) => {
        res.status(200).send(JSON.stringify(genereateResponse(response)));
    })
    .catch((error) => {
        res.status(404).send("<h1> 404 Error </h1>");
        console.log(error);
    })
})

// Get countries by continent
app.get('/api/countries/continents/:region', (req, res) => {
    axios.get(`https://restcountries.com/v2/region/${req.params.region}`)
    .then((response) => {
        res.status(200).send(JSON.stringify(genereateResponse(response)));
    })
    .catch((error) => {
        res.status(404).send("<h1> 404 Error </h1>");
        console.log(error);
    })
})

function genereateResponse(response){
    let shortResponse = [];
    response.data.forEach((item) => {
        shortResponse.push({
            name: item.name.official,
            population: item.population,
            region: item.region,
            capital: item.capital,
            subregion: item.subregion,
            topLevelDomain: item.tld,
            currencies: item.currencies,
            languages: item.languages,
            border: item.borders,
            flag: item.flags.png
        })
    })
    return shortResponse;
}