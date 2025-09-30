
//------------ Input  -------------------
// const input = document.querySelector('#phone');
// input.addEventListener('input', (event) => {
//     let val = event.target.value.replace(/\D/g, '').slice(0, 10);
//     let formatted = val
//     .replace(/^(\d{4})(\d{0,3})(\d{0,3})$/, (match, g1, g2, g3) =>
//         [g1, g2, g3].filter(Boolean).join('-')
//     );
//     event.target.value = formatted;
// });

//------------ Dropdown -------------------
document.querySelectorAll('.dropdown-box').forEach(dropdown => {
    const selected = dropdown.querySelector('.selected-option');
    const menu = dropdown.querySelector('.dropdown-menu');
    const items = menu.querySelectorAll('li');

    selected.addEventListener('click', () => {
        dropdown.classList.toggle('open');
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            const value = item.getAttribute('data-value');
            selected.textContent = value;

            selected.classList.add('filled');

            items.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');

            dropdown.classList.remove('open');
        });
    });
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
});
//------------ checked => disable input & dropdown -------------------
const chk = document.getElementById('opt-contract');
const scope = document.getElementById('contact-address');
if (chk && scope) {
    chk.addEventListener('change', () => {
        const disabled = chk.checked;
        scope.dataset.disabled = disabled;
        scope.querySelector('input[type="text"]').disabled = disabled;
    });
}

//------------ Progress -------------------
const percent = 30;
const remaining = 2;

document.querySelectorAll('.upload-state').forEach((box) => {
    if (box.dataset.status === 'uploading') {
        const fill = box.querySelector('.progress-fill');
        const info = box.querySelector('.progress-info');
        if (fill) fill.style.width = percent + '%';
        if (info) info.textContent = `剩餘 ${remaining} 分鐘・${percent}%`;
    }
});

//------------ Cover img | animation -------------------
document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.cover_img');
    if (!card) return;

    const MAX_TILT = 5;

    //-------- img_form listen to cursor --------
    window.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const px = (e.clientX - rect.left - cx) / cx;
        const py = (e.clientY - rect.top  - cy) / cy;

        gsap.to(card, {
            rotationY: px * MAX_TILT,
            rotationX: -py * MAX_TILT,
            transformPerspective: 500,
            ease: 'expo.out',
            duration: 0.001
        });
    });
    //-------- img_file --------
    gsap.to(".img_file", {
        y: -15,
        duration: 2, 
        yoyo: true,  
        repeat: -1,
        ease: "sine.inOut"
    });
    //-------- img_cursor --------
    gsap.to(".img_cursor", {
        x: -30,
        y: -30,
        duration: 1.5, 
        yoyo: true,  
        repeat: -1,
        ease: "sine.inOut"
    });
    //-------- img_pen --------
    gsap.to(".img_pen", {
        rotation: -45,
        transformOrigin: "left center",
        duration: .5, 
        yoyo: true,  
        repeat: -1,
        ease: "circ.inOut"
    });

    //-------- img_drawingline --------
    // const svgNS = "http://www.w3.org/2000/svg";
    // const svg = document.createElementNS(svgNS, "svg");
    // svg.setAttribute("viewBox", "0 0 89 33");
    // svg.setAttribute("width", "40");
    // svg.setAttribute("height", "40");
    // svg.style.maxHeight = "50vh";

    // const path = document.createElementNS(svgNS, "path");
    // path.setAttribute("fill", "none");
    // path.setAttribute("stroke", "#2F5BE1");
    // path.setAttribute("stroke-opacity", "0.4");
    // path.setAttribute("stroke-width", "6");
    // path.setAttribute("stroke-linecap", "round");
    // path.setAttribute(
    //     "d",
    //     "M3 19.6961C11.273 12.0787 20.4304 6.24974 26.7515 5.6525C31.0154 5.24963 28.5756 14.6513 28.4249 18.0323C28.3621 19.4414 28.7592 20.2306 30.1649 19.9403C38.3149 15.6281 43.7765 12.0114 56 3"
    // );

    // svg.appendChild(path);
    // document.getElementById("drawingline").appendChild(svg);

    // gsap.from("#drawingline path", {
    //     drawSVG: "0%",
    //     duration: 1.5,
    //     ease: "slow(0.7,0.7,false)"
    // });
});


