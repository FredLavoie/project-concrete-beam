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
  if(data.Mf <= 0 || data.h <= 0 || data.d <= 0 || data.b <= 0 || data.fc <= 0 || data.cover <= 0) {
    return alert('Input value(s) missing and/or are negative numbers!');
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
  let Kr = (mf * 1e6)/(b * d * d);
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

  // calculate results for 10M bars
  let numBars10 = Math.ceil(asreq / 100);
  let as10 = numBars10 * 100;
  let rho10 = as10 / (data.b * data.d);
  let kr10 = (1-((rho10 * 0.85 * 400) / (2 * data.alpha1 * 0.65 * data.fc))) * (rho10 * 0.85 * 400);
  let mr10 = kr10 * data.b * data.d * data.d / 1e6;
  document.querySelector('#numBars10').innerHTML = numBars10;
  document.querySelector('#as10').innerHTML = as10;
  document.querySelector('#mr10').innerHTML = mr10.toFixed(0);

  // calculate results for 15M bars
  let numBars15 = Math.ceil(asreq / 200);
  let as15 = numBars15 * 200;
  let rho15 = as15 / (data.b * data.d);
  let kr15 = (1-((rho15 * 0.85 * 400) / (2 * data.alpha1 * 0.65 * data.fc))) * (rho15 * 0.85 * 400);
  let mr15 = kr15 * data.b * data.d * data.d / 1e6;
  document.querySelector('#numBars15').innerHTML = numBars15;
  document.querySelector('#as15').innerHTML = as15;
  document.querySelector('#mr15').innerHTML = mr15.toFixed(0);

  // calculate results for 20M bars
  let numBars20 = Math.ceil(asreq / 300);
  let as20 = numBars20 * 300;
  let rho20 = as20 / (data.b * data.d);
  let kr20 = (1-((rho20 * 0.85 * 400) / (2 * data.alpha1 * 0.65 * data.fc))) * (rho20 * 0.85 * 400);
  let mr20 = kr20 * data.b * data.d * data.d / 1e6;
  document.querySelector('#numBars20').innerHTML = numBars20;
  document.querySelector('#as20').innerHTML = as20;
  document.querySelector('#mr20').innerHTML = mr20.toFixed(0);

  // calculate results for 25M bars
  let numBars25 = Math.ceil(asreq / 500);
  let as25 = numBars25 * 500;
  let rho25 = as25 / (data.b * data.d);
  let kr25 = (1-((rho25 * 0.85 * 400) / (2 * data.alpha1 * 0.65 * data.fc))) * (rho25 * 0.85 * 400);
  let mr25 = kr25 * data.b * data.d * data.d / 1e6;
  document.querySelector('#numBars25').innerHTML = numBars25;
  document.querySelector('#as25').innerHTML = as25;
  document.querySelector('#mr25').innerHTML = mr25.toFixed(0);

  // calculate results for 30M bars
  let numBars30 = Math.ceil(asreq / 700);
  let as30 = numBars30 * 700;
  let rho30 = as30 / (data.b * data.d);
  let kr30 = (1-((rho30 * 0.85 * 400) / (2 * data.alpha1 * 0.65 * data.fc))) * (rho30 * 0.85 * 400);
  let mr30 = kr30 * data.b * data.d * data.d / 1e6;
  document.querySelector('#numBars30').innerHTML = numBars30;
  document.querySelector('#as30').innerHTML = as30;
  document.querySelector('#mr30').innerHTML = mr30.toFixed(0);
};