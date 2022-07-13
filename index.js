$(document).ready(function () {
    // let i = 10;
    // let int = setInterval(function () {
    //     window.scrollTo({
    //         top: i,
    //         behavior: 'smooth'
    //     });
    //     i += 10;
    //     if (i >= document.body.scrollHeight) clearInterval(int);
    // }, 20);



    ///////////// COUNT DOWN TO NEW VERSION
    let daysItem = document.querySelector("#cdv-days");
    let hoursItem = document.querySelector("#cdv-hours");
    let minItem = document.querySelector("#cdv-min");
    let secItem = document.querySelector("#cdv-sec");
    let countDown = () => {
        let futureDate = getNextReleaseTime();
        let currentDate = new Date();
        let myDate = futureDate - currentDate;

        let days = Math.floor(myDate / 1000 / 60 / 60 / 24);
        let hours = Math.floor(myDate / 1000 / 60 / 60) % 24;
        let min = Math.floor(myDate / 1000 / 60) % 60;
        let sec = Math.floor(myDate / 1000) % 60;

        daysItem.innerHTML = days;
        hoursItem.innerHTML = hours;
        minItem.innerHTML = min;
        secItem.innerHTML = sec;
    }
    countDown();
    setInterval(countDown, 1000);
});

function getNextReleaseTime() {
    const currentDate = new Date();
    let nextDate = currentDate.setHours(0, 0, 0, 1);
    nextDate = currentDate.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
    return nextDate;
}