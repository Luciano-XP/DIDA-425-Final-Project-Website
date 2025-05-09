gsap.registerPlugin(ScrollTrigger);

// textillate setup
let tlt = $('.tlt');
tlt.textillate({ in: { effect: 'fadeInDown' },out: { effect: 'fadeOutDown' }, autoStart: false });


ScrollTrigger.create({
    trigger: "#section1 .row",
    start: "top 80%",
    onEnter: () => {
        tlt.textillate('in');
        gsap.fromTo("#section1 .row", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
    },
    onLeave: () => {
        tlt.textillate('out');
        gsap.fromTo("#section1 .row", { opacity: 1, y: 0 }, { opacity: 0, y: 100, duration: 1, ease: "power2.out" });
    },
    onEnterBack: () => {
        tlt.textillate('in');
        gsap.fromTo("#section1 .row", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
    },
    onLeaveBack: () => {
        tlt.textillate('out');
        gsap.fromTo("#section1 .row", { opacity: 1, y: 0 }, { opacity: 0, y: 100, duration: 1, ease: "power2.out" });
    }
});


ScrollTrigger.create({
    trigger: "#section2 .row",
    start: "top 80%",
    onEnter: () => gsap.fromTo("#section2 .row", { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1, ease: "power2.out" }),
    onLeaveBack: () => gsap.fromTo("#section2 .row", { opacity: 1, x: 0 }, { opacity: 0, x: -100, duration: 1, ease: "power2.out" })
});

ScrollTrigger.create({
    trigger: "#section3 .row",
    start: "top 80%",
    onEnter: () => gsap.fromTo("#section3 .row", { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 1, ease: "power2.out" }),
    onLeaveBack: () => gsap.fromTo("#section3 .row", { opacity: 1, x: 0 }, { opacity: 0, x: 100, duration: 1, ease: "power2.out" })
});

ScrollTrigger.create({
    trigger: "#section4 .row",
    start: "top 80%",
    onEnter: () => gsap.fromTo("#section4 .row", { opacity: 0, rotate: -45 }, { opacity: 1, rotate: 0, duration: 1, ease: "power2.out" }),
    onLeaveBack: () => gsap.fromTo("#section4 .row", { opacity: 1, rotate: 0 }, { opacity: 0, rotate: -45, duration: 1, ease: "power2.out" })
});

ScrollTrigger.create({
    trigger: "#section5 .row",
    start: "top 80%",
    onEnter: () => gsap.fromTo("#section5 .row", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }),
    onLeaveBack: () => gsap.fromTo("#section5 .row", { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5, duration: 1, ease: "power2.out" })
});

ScrollTrigger.create({
    trigger: "#section6 .row",
    start: "top 80%",
    onEnter: () => gsap.fromTo("#section6 .row", { opacity: 0, skewX: 45 }, { opacity: 1, skewX: 0, duration: 1, ease: "power2.out" }),
    onLeaveBack: () => gsap.fromTo("#section6 .row", { opacity: 1, skewX: 0 }, { opacity: 0, skewX: 45, duration: 1, ease: "power2.out" })
});

ScrollTrigger.create({
    trigger: "#section7 .row",
    start: "top 80%",
    onEnter: () => gsap.fromTo("#section7 .row", { opacity: 0, skewY: 45 }, { opacity: 1, skewY: 0, duration: 1, ease: "power2.out" }),
    onLeaveBack: () => gsap.fromTo("#section7 .row", { opacity: 1, skewY: 0 }, { opacity: 0, skewY: 45, duration: 1, ease: "power2.out" })
});

ScrollTrigger.create({
    trigger: "#section8 .row",
    start: "top 80%",
    onEnter: () => gsap.fromTo("#section8 .row", { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }),
    onLeaveBack: () => gsap.fromTo("#section8 .row", { opacity: 1, y: 0 }, { opacity: 0, y: -100, duration: 1, ease: "power2.out" })
});

ScrollTrigger.create({
    trigger: "#section9 .row",
    start: "top 80%",
    onEnter: () => gsap.fromTo("#section9 .row", { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }),
    onLeaveBack: () => gsap.fromTo("#section9 .row", { opacity: 1, scale: 1 }, { opacity: 0, scale: 2, duration: 1, ease: "power2.out" })
});

ScrollTrigger.create({
    trigger: "#section10 .row",
    start: "top 80%",
    onEnter: () => gsap.fromTo("#section10 .row", { opacity: 0, y: 50, rotate: 20 }, { opacity: 1, y: 0, rotate: 0, duration: 1, ease: "power2.out" }),
    onLeaveBack: () => gsap.fromTo("#section10 .row", { opacity: 1, y: 0, rotate: 0 }, { opacity: 0, y: 50, rotate: 20, duration: 1, ease: "power2.out" })
});

new bootstrap.ScrollSpy(document.body, {
    target: '#navbar',
    offset: 70
});