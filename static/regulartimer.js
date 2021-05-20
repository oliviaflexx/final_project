// Functions for overall timer
function makedeadline(length) {
    const deadline = new Date(Date.parse(new Date()) + length * 60 * 60 * 1000);
    return deadline;
}
function getTimeRemaining(endtime) {
  const ototal = Date.parse(endtime) - Date.parse(new Date());
  const oseconds = Math.floor((ototal / 1000) % 60);
  const ominutes = Math.floor((ototal / 1000 / 60) % 60);
  const ohours = Math.floor((ototal / (1000 * 60 * 60)) % 24);
  
  return {
    ototal,
    ohours,
    ominutes,
    oseconds
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const ohoursSpan = clock.querySelector('.ohours');
  const ominutesSpan = clock.querySelector('.ominutes');
  const osecondsSpan = clock.querySelector('.oseconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    ohoursSpan.innerHTML = ('0' + t.ohours).slice(-2);
    ominutesSpan.innerHTML = ('0' + t.ominutes).slice(-2);
    osecondsSpan.innerHTML = ('0' + t.oseconds).slice(-2);

    if (t.ototal <= 0) {
      clearInterval(timeinterval);
    }
  }
  
  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

// Functions for per question timer
  function makeQuestionDeadline(length, mc_count) {
    const qdeadline = new Date(Date.parse(new Date()) + (length / mc_count) * 60 * 60 * 1000);
    return qdeadline;
}
  

function initializeClockp(id, endtime, pendtime) {
  const clock = document.getElementById(id);
  const phoursSpan = clock.querySelector('.phours');
  const pminutesSpan = clock.querySelector('.pminutes');
  const psecondsSpan = clock.querySelector('.pseconds');
  var treset = 1;
  document.getElementById('question').innerHTML = up;
  
  function updateClockp() {
    const t = getTimeRemaining(pendtime);
    const ot = getTimeRemaining(endtime);

    phoursSpan.innerHTML = ('0' + t.ohours).slice(-2);
    pminutesSpan.innerHTML = ('0' + t.ominutes).slice(-2);
    psecondsSpan.innerHTML = ('0' + t.oseconds).slice(-2);

    if (t.ototal <= 0) {
      clearInterval(timeintervalp);
      treset = 0;
    }
    
    if (ot.ototal <= 0) {
      clearInterval(timeintervalp);
      document.getElementById('question').innerHTML = "Exam is over";
    }
    
    if (treset == 0) {
      const qdeadline = makeQuestionDeadline(length, mc_count);
      initializeClockp('pclockdiv', deadline, qdeadline);
      up = up + 1;
      document.getElementById('question').innerHTML = up;
      treset = 1;
    }
  }
  
  updateClockp();
  const timeintervalp = setInterval(updateClockp, 1000);
}
  // find out how much time per question there is

var length0 = document.getElementById('length');
var length = Number(length0.innerHTML);
var mc_count0 = document.getElementById('mc_count');
var mc_count = Number(mc_count0.innerHTML);
var up = 1;

const deadline = makedeadline(length);
const qdeadline = makeQuestionDeadline(length, mc_count);

document.getElementById('start').addEventListener('click', function () {
  initializeClock('oclockdiv', deadline);
  initializeClockp('pclockdiv', deadline, qdeadline);
  document.getElementById('start').style.visibility = "hidden";
});

