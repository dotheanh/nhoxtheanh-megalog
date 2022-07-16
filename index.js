$(document).ready(function () {
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

    // handle click FAB
    $("#fab-clock").click(function() {
        $("#table-of-contents").toggleClass("showing");
        $("#table-of-contents .c-summary_list_item").each( function( key, value ) {
            $(this).toggleClass("is-inview");
        });
    });

    // handle barrier anim when scroll to train
});
function getNextReleaseTime() {
    const currentDate = new Date();
    let nextDate = currentDate.setHours(0, 0, 0, 1);
    nextDate = currentDate.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
    return nextDate;
}

function customScrollTo(element, _offset = 0) {
    const target = document.querySelector(element);
    globalScroll.scrollTo(target, {
        duration: 500,
        offset: _offset
    });
}