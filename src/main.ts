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

const tabClasses = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'];
gsap.timeline({
    scrollTrigger: {
        trigger: '#features-section',
        start: 'top top',
        end: `+${(tabClasses.length + 1) * 2000}`,
        scrub: 1,
        pin: true,
    }
});

// ====================
// Scroll triggers - Handle tabs
// ====================

tabClasses.forEach((tabClass, index) => {
    gsap.to(`.${tabClass}`, {
        scrollTrigger: {
            trigger: `#features-carousel .feature-carousel-item:nth-child(${index + 1})`,
            start: 'top top',
            end: `${(index) * 2000}`,
            onLeave: () => changeTab(tabClass),
            onEnterBack: () => changeTab(tabClass),
            markers: true
        }
    });
});

function changeTab(tabClass: string) {
    const tabs = document.querySelectorAll<HTMLElement>('#features-tabs a');

    tabs.forEach(tab => {
        if (tab.classList.contains(tabClass)) {
            tab.classList.add('tab-active');
            changeFeatureContent(tabClass);
        } else {
            tab.classList.remove('tab-active');
        }
    });
}

function changeFeatureContent(tabClass: string) {
    const currentTab = Number(tabClass.split('tab')[1]);
    const featureItems = document.querySelectorAll<HTMLElement>('.feature-carousel-item');

    featureItems.forEach((tab, index) => {
        const isCurrentTab = (index + 1) === currentTab;
        if (!tab.classList.contains('hidden') && !isCurrentTab) {
            gsap.to(tab, {
                opacity: 0,
                duration: 0.15,
                onComplete: () => {
                    tab.classList.toggle('hidden');
                    tab.classList.toggle('flex');
                }
            });
        }

        if (isCurrentTab) {
            tab.classList.remove('hidden');
            tab.classList.add('flex');
            gsap.to(tab, { x: 0, opacity: 1, duration: 0.25 });
        }
    });
}

// ====================
// Jump to tab on click
// ====================

document.querySelectorAll('#features-tabs a').forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        changeTab((e.target as HTMLElement).classList[0]);
    });
});