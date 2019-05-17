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

// store Mf in data object
const moment = document.querySelector('#momentForce');
moment.onblur = function() {
  let mf = Number(document.querySelector('#momentForce').value);
  data.Mf = mf;
}

// store h in data object
const height = document.querySelector('#h');
height.onblur = function() {
  let h = Number(document.querySelector('#h').value);
  data.h = h;
}

// store d in data object
const depth = document.querySelector('#d');
depth.onblur = function() {
  let d = Number(document.querySelector('#d').value);
  data.d = d;
}

// store b in data object
const base = document.querySelector('#b');
base.onblur = function() {
  let b = Number(document.querySelector('#b').value);
  data.b = b;
}

// store cover in data object
const cover = document.querySelector('#cover');
cover.onblur = function() {
  let cov = Number(document.querySelector('#cover').value);
  data.cover = cov;
}

// calculte alpha1 & beta1 values based on f'c and
// store 3 values in data object
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

// calculate As min and As req


// calculate rho balance and rho required
