/*********************************[ data objects ]************************************/
/*************************************************************************************/

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

const rebarArr = [
  { name: '10M', size: 10, area: 100 },
  { name: '15M', size: 15, area: 200 },
  { name: '20M', size: 20, area: 300 },
  { name: '25M', size: 25, area: 500 },
  { name: '30M', size: 30, area: 700 }
];

/********************************[ data storage ]*************************************/
/*************************************************************************************/

// store Mf in data object
document.querySelector('#momentForce').onblur = function() {
  data.Mf = Number(document.querySelector('#momentForce').value);
};

// store b in data object
document.querySelector('#b').onblur = function() {
  data.b = Number(document.querySelector('#b').value);
};

// store d in data object
document.querySelector('#d').onblur = function() {
  data.d = Number(document.querySelector('#d').value);
};

// store h in data object
document.querySelector('#h').onblur = function() {
  data.h = Number(document.querySelector('#h').value);
};

// store cover in data object
document.querySelector('#cover').onblur = function() {
  data.cover = Number(document.querySelector('#cover').value);
};

// store f'c in data object
document.querySelector('#concStr').onblur = function() {
  data.fc = Number(document.querySelector('#concStr').value);
};


/***********************************[ functions ]*************************************/
/*************************************************************************************/

function calcAlpha1Beta1() {
  let alpha = 0.85 - (0.0015 * data.fc);
  let beta = 0.97 - (0.0025 * data.fc);
  data.alpha1 = Math.max(alpha, 0.67);
  data.beta1 = Math.max(beta, 0.67);
  document.querySelector('#alpha1').innerHTML = data.alpha1.toFixed(3);
  document.querySelector('#beta1').innerHTML = data.beta1.toFixed(3);
}

function calcAsMin() {
  let asmin = (0.2 * (Math.pow(data.fc, 0.5)) * data.b * data.h) / 400;
  document.querySelector('#Asmin').innerHTML = asmin.toFixed(0);
}

function calcKr() {
  data.Kr = (data.Mf * 1e6)/(data.b * data.d * data.d);
  document.querySelector('#Kr').innerHTML = data.Kr.toFixed(3);
}

function calculateRhoReq() {
  let a = -115600 / (1.3 * data.alpha1 * data.fc);
  let b = 340;
  let c = -data.Kr;
  let res1 = 100 * ((-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a));
  let res2 = 100 * ((-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a));
  let rhoReq = Math.min(res1, res2);
  document.querySelector('#rhoReq').innerHTML = rhoReq.toFixed(2);

  return rhoReq;
}

function calcAsReq(rhoReq) {
  let asreq = data.b * data.d * rhoReq / 100;
  document.querySelector('#Asreq').innerHTML = asreq.toFixed(0);
  return asreq;
}

function rebarResults(rebarArr, asreq) {
  for(let ea of rebarArr) {
    let numBars = Math.ceil(asreq / ea.area);
    let as = numBars * ea.area;
    let rho = as / (data.b * data.d);
    let kr = (1-((rho*0.85*400) / (2*data.alpha1*0.65*data.fc))) * (rho*0.85*400);
    let mr = kr * data.b * data.d * data.d / 1e6;
    document.querySelector(`#numBars${ea.size}`).innerHTML = numBars;
    document.querySelector(`#as${ea.size}`).innerHTML = as;
    document.querySelector(`#mr${ea.size}`).innerHTML = mr.toFixed(0);
  }
}

/***************************[ calculate button ]*********************************/
/********************************************************************************/

document.querySelector('#subButton').onclick = function() {

  // alert if input numbers missing
  if(data.Mf <= 0 || data.h <= 0 || data.d <= 0 || data.b <= 0
      || data.fc <= 0 || data.cover <= 0) {
    return alert('Input value(s) missing and/or are negative numbers!');
  } else {
    calcAlpha1Beta1();
    calcAsMin();
    calcKr();
    let rhoReq = calculateRhoReq();
    let asreq = calcAsReq(rhoReq);
    rebarResults(rebarArr, asreq);
	}
};

