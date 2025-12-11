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

//------------ Input | Validation -------------------
$.validator.addMethod("twPhone", function (value, element) {
    const phoneReg = /^09\d{2}-\d{3}-\d{3}$/;
    return this.optional(element) || phoneReg.test(value);
});

$("#applyForm").validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        phone: {
            required: true,
            twPhone: true
        },
        
    },
    messages: {
        email: {
            required: "請輸入電子信箱",
            email: "請輸入正確的電子信箱格式（例如：example@gmail.com）"
        },
        phone: {
            required: "請輸入聯絡電話",
            twPhone: "請輸入有效的電話格式，例如：0912-345-678"
        }
    },

    errorClass: "error-message",

    highlight: function (element) {
        element.classList.add("error");
    },
    unhighlight: function (element) {
        element.classList.remove("error");
    },

    errorPlacement: function (error, element) {
        const wrapper = element.closest(".input-box");
        if (wrapper) {
            error.insertAfter(wrapper);
        } else {
            error.insertAfter(element);
        }
    },
    onkeyup: false,
    submitHandler: function (form) {
        form.submit();
    }
});

//============== Dropdown ==============
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
//------------ Dropdown | Birthday -------------------
const birthdaySection = document.querySelector('.birthday-section');
const dropdowns = birthdaySection.querySelectorAll('.dropdown-box');
const currentYear = new Date().getFullYear();

birthdaySection.addEventListener('click', e => {
    const box = e.target.closest('.dropdown-box');
    if (box) {
        box.classList.toggle('open');
        console.log('有加open',box.classList.contains('open'));
    }
});

dropdowns.forEach(drop => {
    const type = drop.dataset.type;
    const menu = drop.querySelector('.dropdown-menu');

    if (type === 'year') {
        for (let y = currentYear; y >= 1980; y--) {
            menu.innerHTML += `<li data-value="${y}">${y}<span class="check-icon"></span></li>`;
        }
    } else if (type === 'month') {
        for (let m = 1; m <= 12; m++) {
            menu.innerHTML += `<li data-value="${m}">${m}<span class="check-icon"></span></li>`;
        }
    }
});
  function updateDays(year, month) {
    const dayBox = birthdaySection.querySelector('.dropdown-box[data-type="day"] .dropdown-menu');
    dayBox.innerHTML = '';
    if (year && month) {
      const days = new Date(year, month, 0).getDate();
      for (let d = 1; d <= days; d++) {
        dayBox.innerHTML += `<li data-value="${d}">${d}<span class="check-icon"></span></li>`;
      }
    }
  }

birthdaySection.addEventListener('click', e => {
    const li = e.target.closest('.dropdown-menu li');
    const box = e.target.closest('.dropdown-box');

  if (li) {
    const selectedText = box.querySelector('.selected-option');
    selectedText.textContent = li.dataset.value;
    box.dataset.selected = li.dataset.value;
    box.classList.toggle('open');


    const year = birthdaySection.querySelector('.dropdown-box[data-type="year"]').dataset.selected;
    const month = birthdaySection.querySelector('.dropdown-box[data-type="month"]').dataset.selected;
    if (year && month) updateDays(year, month);
  } else if (box) {
    console.log('有加open',box.classList.contains('open'));
    box.classList.toggle('open');
  } else {
    birthdaySection.querySelectorAll('.dropdown-box').forEach(b => b.classList.remove('open'));
  }
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

//------------ Upload File | Progress -------------------
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

//------------ Upload File | btn-cancel of Progress switch data-status to idle  -------------------
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-progress-cancel') ) {
        const wrapper = e.target.closest('.upload-state');
        if (wrapper) {
            wrapper.dataset.status = 'idle';
        }
    }
});

function setUploadStatus(target, status = 'idle') {
    const wrapper = target.closest('.upload-state');
    if (wrapper) wrapper.dataset.status = status;
}

//------------ Modal -------------------
fetch("modal.html")
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);

    const overlay    = document.querySelector(".modal-overlay");
    const modal      = document.querySelector(".modal");
    const closeBtn   = document.querySelector(".modal .close");
    const cancelBtn  = document.querySelector('[data-action="cancel"]');
    const confirmBtn = document.querySelector('[data-action="confirm"]');
    const deleteGif  = document.querySelector('.gif_trashbin');

    function restartGif() {
        const ts = Date.now();
        deleteGif.style.setProperty('--gif-url', `url('/img/modal_trashbin_back.gif?${ts}')`);
    }

    function openModal() {
        overlay.classList.add("is-open");
        modal.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        restartGif();
    }

    function closeModal() {
        overlay.classList.remove("is-open");
        modal.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        modal.setAttribute("aria-hidden", "true");
        if (document.activeElement) {
            document.activeElement.blur();
        }
        document.body.style.overflow = "";
    }

    document.addEventListener("click", (e) => {
        const delBtn = e.target.closest(".btn_delte");
        if (delBtn) {
            openModal();
        }
    });

    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });

    confirmBtn.addEventListener("click", () => {
        closeModal();
        setUploadStatus(confirmBtn, 'idle');
    });
});
});

