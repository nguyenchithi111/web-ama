document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.5
    };

    const animateCount = (el) => {
        const target = +el.getAttribute('data-target');
        const duration = 1500;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));

            el.innerText = `${currentCount}+`;

            if (frame === totalFrames) {
                clearInterval(counter);
                el.innerText = `${target}+`;
            }
        }, frameDuration);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.count-up').forEach(el => observer.observe(el));
});