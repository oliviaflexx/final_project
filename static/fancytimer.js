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
      if (timeinterval) {
        clearInterval(timeinterval);
      }
    }
  }
  const timeinterval = setInterval(updateClock, 1000);

}

// Functions for per question timer
function clicky(endtime) {
  // update counter
  counter = counter + 1;
  // update question number with counter
  document.getElementById('question').innerHTML = counter;
  // update multiple choice count
  mc_count = mc_count - 1;
  if (mc_count <= 0) {
    clearInterval(timeintervalp);
    document.getElementById('question').innerHTML = "All questions finished";
    return;
  }
  
  // find out how much time left there is for the exam
  cdeadline0 = getTimeRemaining(endtime);
  //find out how much time there is per question
  cdeadline1 = cdeadline0.ototal / 3600000;
  pquestiontime = cdeadline1 / (mc_count + 1);
  // make a deadline for that question
  qdeadline = makedeadline(pquestiontime);
  
  return {
    qdeadline
  };
}

function clicky2(qdeadline, endtime) {
    const clock = document.getElementById('pclockdiv');
    const phoursSpan = clock.querySelector('.phours');
    const pminutesSpan = clock.querySelector('.pminutes');
    const psecondsSpan = clock.querySelector('.pseconds');
    
  function newUpdateClock() {
    //get time remaining
    const t = getTimeRemaining(qdeadline);
    const ot = getTimeRemaining(endtime);
    
    phoursSpan.innerHTML = ('0' + t.ohours).slice(-2);
    pminutesSpan.innerHTML = ('0' + t.ominutes).slice(-2);
    psecondsSpan.innerHTML = ('0' + t.oseconds).slice(-2);
    
    if (t.ototal <= 0) {
      clearInterval(timeintervalp);
      document.getElementById('question').innerHTML = "No time for this question left";
      return;
    }
    if (ot.ototal <= 0) {
      clearInterval(timeintervalp);
      document.getElementById('question').innerHTML = "Exam is over";
      return;
    }
    if (x == 1) {
      clearInterval(timeintervalp);
      x = 0;
      y = 1;
    }
    if (y == 1) {
      qdeadline0 = clicky(deadline);
      qdeadline = qdeadline0.qdeadline;
      y = 0;
      clicky2(qdeadline, deadline);
    }
  }
  newUpdateClock();
  const timeintervalp = setInterval(newUpdateClock, 1000);
}
function stop() {
  x = 1;
}
var length0 = document.getElementById('length');
var length = Number(length0.innerHTML);
var c = 1;
const deadline = makedeadline(length);
var x = 0;
var y = 0;

var mc_count0 = document.getElementById('mc_count');
var mc_count = Number(mc_count0.innerHTML) + 1;
var counter = 0;

document.getElementById('start').addEventListener('click', function () {
  initializeClock('oclockdiv', deadline);
  qdeadline0 = clicky(deadline);
  qdeadline = qdeadline0.qdeadline;
  clicky2(qdeadline, deadline);
  document.getElementById('start').style.visibility = "hidden";
});