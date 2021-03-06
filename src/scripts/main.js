
(function() {
    $("#fab-container").css("visibility", "hidden");
    document.documentElement.classList.add('is-loaded');
    document.documentElement.classList.remove('is-loading');

    setTimeout(() => {
        document.documentElement.classList.add('is-ready');
    },300)


    setTimeout(() => {        
        // const target = document.querySelector('#section-references');
        // globalScroll.scrollTo("bottom", {
        //     duration: 100000,
        // });

        let dynamicBackgrounds = [];
        let dynamicColorElements = [];

        globalScroll.on('scroll', (instance) => {
            const progress = 360 * instance.scroll.y / instance.limit.y;

            globalScroll.el.style.backgroundColor = `hsl(${progress}, 11%, 81%)`;

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

            // HIGHLIGHT CURRENT showing POSITION IN MENU
            if (Object.keys(instance.currentElements).length > 0) {
                let sectionName = $(instance.currentElements[Object.keys(instance.currentElements)[0]].el).closest("section").attr("id");

                if ($("#table-of-contents").hasClass("showing")) {
                    $("#table-of-contents .item-scroll-to").each(function( key, value ) {
                        let data = $(this).attr("data");
                        if (data.includes(sectionName)) {
                            $(this).find(".c-summary_list_icon").text("←");
                        }
                        else {
                            $(this).find(".c-summary_list_icon").text("");
                        }
                    });
                }
                
                handleUIAtSection(sectionName, instance);
            }
        });

        globalScroll.on('call', (value, way, obj) => {
            if (value === 'onEnterSection') {
                let currentSectionId = $(obj.el).attr("id");
                console.log("onEnterSection", currentSectionId);
            }
            else if (value === 'dynamicBackground') {
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
