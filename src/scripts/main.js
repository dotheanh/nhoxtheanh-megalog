
(function() {
    $("#fab-container").css("visibility", "hidden");
    document.documentElement.classList.add('is-loaded');
    document.documentElement.classList.remove('is-loading');

    setTimeout(() => {
        document.documentElement.classList.add('is-ready');
    },300)

    let options = {
        el: document.querySelector('#js-scroll'),
        smooth: true,
        getSpeed: true,
        getDirection: true
    }

    if(document.querySelector('#js-scroll').getAttribute('data-horizontal') == 'true') {
        options.direction = 'horizontal';
        options.gestureDirection = 'both';
        options.tablet = {
            smooth: true,
            direction: 'horizontal',
            horizontalGesture: true
        }
        options.smartphone = {
            smooth: false
        }
        options.reloadOnContextChange = true
    }

    setTimeout(() => {
        const scroll = new LocomotiveScroll(options);
        
        // const target = document.querySelector('#section-references');
        // scroll.scrollTo("bottom", {
        //     duration: 100000,
        // });

        let dynamicBackgrounds = [];
        let dynamicColorElements = [];

        scroll.on('scroll', (instance) => {
            const progress = 360 * instance.scroll.y / instance.limit.y;

            scroll.el.style.backgroundColor = `hsl(${progress}, 11%, 81%)`;

            dynamicBackgrounds.forEach(obj => {
                obj.el.style.backgroundColor = `hsl(${progress}, 11%, 81%)`;
            });
            dynamicColorElements.forEach(obj => {
                obj.el.style.color = `hsl(${progress}, 11%, 81%)`;
            });

            document.documentElement.setAttribute('data-direction', instance.direction)

            // DISPLAY FAB PROGRESS
            const NO_CLOCK_OFFSET = 20; // ở đoạn đầu trang web thì ko hiện FAB đồng hồ và ko tính progress
            const clockProgress = (progress - NO_CLOCK_OFFSET)*360/(360 - NO_CLOCK_OFFSET);
            if (clockProgress < 0) {
                $("#fab-container").css("visibility", "hidden");
                $("#fab-container").removeClass("fab-show");
            }
            else {
                $("#fab-container").css("visibility", "visible");
                $("#fab-container").addClass("fab-show");
            }
            let hour = (clockProgress);
            let minus = (hour*12);
            let second = (minus*60);

            // 0, -80, 35 là để chỉnh các kim về vị trí 0 giờ
            $("#fab-clock .clock-hand-hour").css("transform",`rotate(`+(0+hour)+`deg)`);
            $("#fab-clock .clock-hand-minus").css("transform",`rotate(`+(-80+minus)+`deg)`);
            $("#fab-clock .clock-hand-second").css("transform",`rotate(`+(35+second)+`deg)`);
        });

        scroll.on('call', (value, way, obj) => {
            if (value === 'dynamicBackground') {
                if(way === 'enter') {
                    dynamicBackgrounds.push({
                        id: obj.id,
                        el: obj.el
                    });
                } else {
                    for (var i = 0; i < dynamicBackgrounds.length; i++) {
                        if(obj.id === dynamicBackgrounds[i].id) {
                            dynamicBackgrounds.splice(i,1);
                        }
                    }
                }
            } else if (value === 'dynamicColor') {
                if(way === 'enter') {
                    dynamicColorElements.push({
                        id: obj.id,
                        el: obj.el
                    });
                } else {
                    for (var i = 0; i < dynamicColorElements.length; i++) {
                        if(obj.id === dynamicColorElements[i].id) {
                            dynamicColorElements.splice(i,1);
                        }
                    }
                }
            }
        });

    }, 1000)

})();
