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

// 監聽勾選
chk.addEventListener('change', () => {
  const disabled = chk.checked; // 勾選 = 要鎖住
  scope.dataset.disabled = disabled; // 方便 CSS 用
  // 鎖文字輸入框
  scope.querySelector('input[type="text"]').disabled = disabled;
});

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

    const MAX_TILT = 15;

    const idle = gsap.to(card, {
        keyframes: [
            { rotationX: 15, rotationY: -15, duration: 3 },
            { rotationX: -10, rotationY: 20, duration: 3 },
            { rotationX: 12, rotationY: -8, duration: 2.5 },
            { rotationX: 0,  rotationY: 0,  duration: 2 }
        ],
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        paused: false
    });

    card.addEventListener('mouseenter', () => {
        idle.pause();
    });

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const px = (e.clientX - rect.left - cx) / cx;
        const py = (e.clientY - rect.top  - cy) / cy;

    gsap.to(card, {
        rotationY: px * MAX_TILT,
        rotationX: -py * MAX_TILT,
        transformPerspective: 1000,
        ease: 'power4.out',
        duration: 0.2
    });
});

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            ease: 'power4.out',
            duration: 0.4,
            onComplete: () => idle.resume()
        });
    });
});