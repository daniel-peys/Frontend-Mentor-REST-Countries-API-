const grid = document.querySelector("body > .grid-template");
const title = document.querySelector("title");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

function generateTempalte(
  imgSource,
  name,
  population,
  region,
  capital,
  subregion,
  topLevelDomain,
  currency,
  borders,
  languages
) {
  return `
<div class="col-img">
    <img src="${imgSource}" alt="flag" />
</div>
<div class="grid-template-small">
    <h2 class="grid-col-span-2">${name}</h2>
    <div class="col-text">
        <h3><span>Population:</span> ${population}</h3>
        <h3><span>Region:</span> ${region}</h3>
        <h3><span>Sub Region:</span> ${subregion}</h3>
        <h3><span>Languages:</span> ${languages}</h3>
    </div>
    <div class="col-text">
        <h3><span>Capital:</span> ${capital}</h3>
        <h3><span>Top Level Domain:</span> ${
          topLevelDomain == undefined ? "None" : topLevelDomain
        }</h3>
        <h3><span>Currency:</span> ${currency}
        </h3>
    </div>
    <div class="grid-col-span-2 border-row">
        <h3><span>Border Countries:</span></h3>
        ${generateBorderTemplate(borders)}
    </div>
</div>
`;
}

function generateBorderTemplate(borders) {
  if (borders == undefined) {
    return "<p> None </p>";
  }
  let template = "";
  borders.forEach((border) => {
    template += `
    <p> ${border} </p>
    `;
  });
  return template;
}

fetch(
  `http://localhost:5000/api/countries/${params.name.replaceAll(" ", "%20")}`
).then((response) => {
  response.json().then((country) => {
    title.innerHTML = country[0].name;
    grid.innerHTML += generateTempalte(
      country[0].flag,
      country[0].name,
      country[0].population,
      country[0].region,
      country[0].capital,
      country[0].subregion,
      country[0].topLevelDomain,
      Object.values(country[0].currencies)[0].name,
      country[0].border,
      Object.values(country[0].languages).join(", ")
    );
  });
});

function back() {
  window.location.href = "./index.html";
}
