// list of cities with their data
const cities = [
  {name: 'Cornwall', Ss: 2.2, Sr: 0.4},
  {name: 'Kingston', Ss: 2.1, Sr: 0.4},
  {name: 'Ottawa', Ss: 2.4, Sr: 0.4},
];

// object that holds the values chosen by user
const data = {Ss: 0, Sr: 0, Ie: 0};

// list of load factors
let cb = 0.8;
let cw = 1.0;
let cs = 1.0;
let ca = 1.0;

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

