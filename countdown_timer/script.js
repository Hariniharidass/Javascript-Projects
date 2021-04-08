const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minEl = document.getElementById('minutes');
const secEl = document.getElementById('seconds');


function countdown()
{
    const myDate = new Date('26 jun 2021');
    const currentDate = new Date();
    const ms = (myDate - currentDate) / 1000;

    const days = Math.floor(ms / 3600 / 24);
    const hours = Math.floor(ms / 3600) % 24;
    const min = Math.floor(ms / 60) % 60;
    const sec = Math.floor(ms % 60);


    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minEl.innerHTML = formatTime(min);
    secEl.innerHTML = formatTime(sec);

}

function formatTime(time)
{
    return time < 10 ? (`0${time}`) : time;

}
countdown();
setInterval(countdown, 1000);