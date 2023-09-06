let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25; // Defina o tempo de trabalho em minutos
let breakTime = 5; // Defina o tempo de descanso em minutos

let seconds = "00";

let audio = new Audio('assets/audios/alert_iphone.mp3');

function playAlertSound() {
  audio.play();
}

function showAlertMessage(message) {
  let userResponse = confirm(message);
  if (userResponse) {
    audio.pause();
    audio.currentTime = 0;
  }
}

window.onload = () => {
  document.getElementById('minutes').innerHTML = workTime;
  document.getElementById('seconds').innerHTML = seconds;

  workTittle.classList.add('active');
}

function start() {
  document.getElementById('start').style.display = "none";
  document.getElementById('reset').style.display = "block";

  seconds = 59;

  let workMinutes = workTime - 1;
  let breakMinutes = breakTime - 1;

  breakCount = 0;

  let timerFunction = () => {
    document.getElementById('minutes').innerHTML = workMinutes;
    document.getElementById('seconds').innerHTML = seconds;

    seconds = seconds - 1;

    if (seconds === 0) {
      workMinutes = workMinutes - 1;
      if (workMinutes === -1) {
        if (breakCount % 2 === 0) {
          playAlertSound();
          workMinutes = breakMinutes;
          breakCount++;

          workTittle.classList.remove('active');
          breakTittle.classList.add('active');

          showAlertMessage("É hora do intervalo!");
        } else {
          playAlertSound();
          workMinutes = workTime;
          breakCount++;

          breakTittle.classList.remove('active');
          workTittle.classList.add('active');

          showAlertMessage("É hora de voltar ao trabalho!");
        }
      }
      seconds = 59;
    }
  }

  setInterval(timerFunction, 1000);
}