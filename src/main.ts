import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ====================
// Register Plugins
// ====================

gsap.registerPlugin(ScrollTrigger);
console.log("GSAP Loaded!")

// ====================
// Scroll triggers - Feature section
// ====================

let featureTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '#features-section',
        start: 'center center',
        end: '+=2000',
        scrub: 1,
        pin: true,
        snap: {
            snapTo: 'labels',
            duration: { min: 0.2, max: 3 },
            delay: 0.2,
        }
    }
});

featureTimeline.from('#features-text', { y: 100, opacity: 0 })
    .fromTo('.feature-card', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: 'power1.inOut', stagger: 0.5 })
    .addLabel("end-card")