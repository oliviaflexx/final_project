// Functions for overall timer
function makedeadline(length) {
    const deadline = new Date(Date.parse(new Date()) + length);
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

    percent = (t.ototal / length) * 100;
    progressBarOverall.style.setProperty('--width', percent);
    
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
  // update multiple choice count
  mc_count = mc_count - 1;
  if (mc_count <= 0) {
    document.getElementById('question').innerHTML = "All questions finished!";
    return;
  }
  // update counter
  counter = counter + 1;
  // update question number with counter
  document.getElementById('question').innerHTML = "Question #" + counter;
  // find out how much time left there is for the exam
  cdeadline0 = getTimeRemaining(endtime);
  //find out how much time there is per question
  cdeadline1 = cdeadline0.ototal;
  pquestiontime = cdeadline1 / mc_count;
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
    if (z == 1) {
      start = t.ototal;
      z = 0;
    }
    if (w == 1) {
      t.ototal = 1;
      phoursSpan.innerHTML = '00';
      pminutesSpan.innerHTML = '00';
      psecondsSpan.innerHTML = '00';
    }
    else {
      phoursSpan.innerHTML = ('0' + t.ohours).slice(-2);
      pminutesSpan.innerHTML = ('0' + t.ominutes).slice(-2);
      psecondsSpan.innerHTML = ('0' + t.oseconds).slice(-2);
      
      percent = (t.ototal / start) * 100;
      progressBarQuestion.style.setProperty('--width', percent);
    }
    
    if (t.ototal <= 0) {
      newcounter = document.getElementById('question').innerHTML;
      document.getElementById('question').innerHTML = "No time for " + newcounter + " left";
      w = 1;
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
      w = 0;
    }
    if (y == 1) {
      qdeadline0 = clicky(endtime);
      qdeadline = qdeadline0.qdeadline;
      y = 0;
      z = 1;
      clicky2(qdeadline, endtime);
    }
  }
  newUpdateClock();
  const timeintervalp = setInterval(newUpdateClock, 1000);
}
function stop() {
  x = 1;
}
var length0 = document.getElementById('length');
var length = Number(length0.innerHTML) * 60 * 60 * 1000;
var c = 1;
var x = 0;
var y = 0;
var w = 0;
var z = 1;

var mc_count0 = document.getElementById('mc_count');
var mc_count = Number(mc_count0.innerHTML) + 1;
var counter = 0;

const progressBarOverall = document.getElementById('overall-bar');
const progressBarQuestion = document.getElementById('question-bar');

document.getElementById('start').addEventListener('click', function () {
  const deadline = makedeadline(length);
  initializeClock('oclockdiv', deadline);
  qdeadline0 = clicky(deadline);
  qdeadline = qdeadline0.qdeadline;
  clicky2(qdeadline, deadline);
  document.getElementById('start').style.visibility = "hidden";
  document.getElementById('next').style.visibility = "visible";
});

