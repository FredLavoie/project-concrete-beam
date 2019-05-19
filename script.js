// object that holds the values provided by user
const data = {
  Mf: 0,
  b: 0,
  d: 0,
  h: 0,
  fc: 0,
  cover: 0,
  alpha1: 0,
  beta1: 0,
  Kr: 0
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
};

// store b in data object
const base = document.querySelector('#b');
base.onblur = function() {
  let b = Number(document.querySelector('#b').value);
  data.b = b;
};

// store d in data object
const depth = document.querySelector('#d');
depth.onblur = function() {
  let d = Number(document.querySelector('#d').value);
  data.d = d;
};

// store h in data object
const height = document.querySelector('#h');
height.onblur = function() {
  let h = Number(document.querySelector('#h').value);
  data.h = h;
};

// store cover in data object
const cover = document.querySelector('#cover');
cover.onblur = function() {
  let cov = Number(document.querySelector('#cover').value);
  data.cover = cov;
};

// store f'c in data object
const concSt = document.querySelector('#concStr');
concSt.onblur = function() {
  let concStr = Number(document.querySelector('#concStr').value);
  data.fc = concStr;
};

// 'Submit' button functions
const parameters = document.querySelector('#button1');
parameters.onclick = function() {
  
  // alert if input numbers missing
  if(data.Mf == 0 || data.h == 0 || data.d == 0 || data.b == 0 || data.fc == 0 || data.cover == 0) {
    return alert('Input value(s) missing!');
  }

  // calculte alpha1 & beta1 and store them in data object
  let fc = data.fc;
  let alpha = 0.85 - (0.0015 * fc);
  let beta = 0.97 - (0.0025 * fc);
  let alpha1 = Math.max(alpha, 0.67);
  let beta1 = Math.max(beta, 0.67);
  data.alpha1 = alpha1;
  data.beta1 = beta1;
  document.querySelector('#alpha1').innerHTML = alpha1.toFixed(3);
  document.querySelector('#beta1').innerHTML = beta1.toFixed(3);

  // calculate As min
  let b = data.b;
  let h = data.h;
  let asmin = (0.2 * (Math.pow(fc, 0.5)) * b * h) / 400;
  document.querySelector('#Asmin').innerHTML = asmin.toFixed(0);

  // calculate Kr and store it in data object
  let mf = data.Mf;
  let d = data.d;
  let Kr = (mf * Math.pow(10, 6))/(b * d * d);
  data.Kr = Kr;
  document.querySelector('#Kr').innerHTML = Kr.toFixed(3);
};

// calculate button functions
const results = document.querySelector('#button2');
results.onclick = function() {
  
  // calculate rho req
  let a = -115600 / (1.3 * data.alpha1 * data.fc);
  let b = 340;
  let c = -data.Kr;
  let res1 = 100 * ((-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a));
  let res2 = 100 * ((-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a));
  let rhoReq = Math.min(res1, res2);
  document.querySelector('#rhoReq').innerHTML = rhoReq.toFixed(2);
  
  // calculate As req
  let asreq = data.b * data.d * rhoReq / 100;
  document.querySelector('#Asreq').innerHTML = asreq.toFixed(0);
};