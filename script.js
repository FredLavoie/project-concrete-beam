// object that holds the values provided by user
const data = {
  Mf: 0,
  b: 0,
  d: 0,
  h: 0,
  fc: 0,
  fy: 400,
  cover: 0
};

// object containing available rebar data
const rebarData = [
  {name: '10M', dia: 11.3, area: 100},
  {name: '15M', dia: 16.0, area: 200},
  {name: '20M', dia: 19.5, area: 300},
  {name: '25M', dia: 25.2, area: 500},
  {name: '30M', dia: 29.9, area: 700}
];

// object containing rebar data to be used in calculation
const rebarChosen = {name: null, dia: 0, area: 0}; 











// get 'Ss' and 'Sr' values in city based on selection
const city = document.querySelector('#city');
city.onchange = function() {
  for(let i = 0; i < cities.length; i++) {
    if(cities[i].name == city.value) {
      document.querySelector('#ss').innerHTML = cities[i].Ss + ' kPa';
      document.querySelector('#sr').innerHTML = cities[i].Sr + ' kPa';
      data.Ss = (cities[i].Ss);
      data.Sr = (cities[i].Sr);
    }
  }
};

// display importance factor based on selected category
const imp = document.querySelector('#importance');
imp.onchange = function() {
  data.Ie = (Number(imp.value));
  document.querySelector('#imp').innerHTML = imp.value;
};


// calculate and display the basic snow load
const finalAnswer = document.querySelector('#answer');
finalAnswer.onclick = function() {
  let ss = data.Ss;
  let sr = data.Sr;
  let ie = data.Ie;
  let snow = ie * (ss * (cb * cw * cs * ca) + sr);
  document.querySelector('#snow').innerHTML = snow.toFixed(2) + ' kPa';
};

