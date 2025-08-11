//------------ input  -------------------
const input = document.querySelector('#phone');
input.addEventListener('input', (event) => {
    let val = event.target.value.replace(/\D/g, '').slice(0, 10);
    let formatted = val
    .replace(/^(\d{4})(\d{0,3})(\d{0,3})$/, (match, g1, g2, g3) =>
        [g1, g2, g3].filter(Boolean).join('-')
    );
    event.target.value = formatted;
});

//------------ dropdown -------------------
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