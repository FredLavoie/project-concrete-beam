// object that holds the values provided by user
const data = {
  Mf: 0,
  b: 0,
  d: 0,
  h: 0,
  fc: 0,
  fy: 400,
  cover: 0,
  alpha1: 0,
  beta1: 0
};

// object containing available rebar data
const rebarData = [
  {name: '10M', dia: 11.3, area: 100},
  {name: '15M', dia: 16.0, area: 200},
  {name: '20M', dia: 19.5, area: 300},
  {name: '25M', dia: 25.2, area: 500},
  {name: '30M', dia: 29.9, area: 700}
];

// calculte alpha1 value based on f'c provided
const concreteStrength = document.querySelector('#concStr');
concreteStrength.onblur = function() {
  let fc = Number(document.querySelector('#concStr').value);
  let a = 0.85 - (0.0015 * fc);
  let b = 0.97 - (0.0025 * fc);
  let alpha1 = Math.max(a, 0.67);
  let beta1 = Math.max(b, 0.67);
  data.fc = fc;
  data.alpha1 = alpha1;
  data.beta1 = beta1;
  document.querySelector('#alpha1').innerHTML = alpha1.toFixed(3);
  document.querySelector('#beta1').innerHTML = beta1.toFixed(3);
};

// calculate rho balance and rho required
