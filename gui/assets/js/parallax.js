(function () {
    // Smooth parallax using lerp and requestAnimationFrame
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    const ease = 0.08; // smaller = smoother
    const amp1 = 0.02; // low amplitude layers
    const amp2 = 0.04;
    const amp3 = 0.08;

    function onMouseMove(e) {
        const w = window.innerWidth / 2;
        const h = window.innerHeight / 2;
        const mx = (e.clientX - w) / w; // -1 .. 1
        const my = (e.clientY - h) / h; // -1 .. 1
        targetX = mx;
        targetY = my;
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function animate() {
        currentX = lerp(currentX, targetX, ease);
        currentY = lerp(currentY, targetY, ease);

        const _depth1 = `${50 - currentX * 100 * amp1}% ${50 - currentY * 100 * amp1}%`;
        const _depth2 = `${50 - currentX * 100 * amp2}% ${50 - currentY * 100 * amp2}%`;
        const _depth3 = `${50 - currentX * 100 * amp3}% ${50 - currentY * 100 * amp3}%`;

        const pos = `${_depth3}, ${_depth2}, ${_depth1}`;
        document.body.style.backgroundPosition = pos;
        requestAnimationFrame(animate);
    }

    // Fallback: reduce motion on touch / mobile
    if (!('ontouchstart' in window)) {
        document.addEventListener('mousemove', onMouseMove);
    }
    requestAnimationFrame(animate);
})();