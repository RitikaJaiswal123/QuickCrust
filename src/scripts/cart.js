let cartItems = [];

function updateCartDisplay() {
    const cartModalBody = document.querySelector('.modal-body');
    const lblCount = document.getElementById('lblCount');

    cartModalBody.innerHTML = ''; // Clear previous items

    cartItems.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('mb-3');
        itemDiv.innerHTML = `
            <p><strong>${item.name}</strong> - ₹${item.price}</p>
        `;
        cartModalBody.appendChild(itemDiv);
    });

    lblCount.innerText = cartItems.length;
}

function ShowCart() {
    updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    const cartButtons = document.querySelectorAll('.CartBtn');

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.box');
            if (!card) {
                console.warn('Could not find .box ancestor for CartBtn');
                return;
            }

            const nameEl = card.querySelector('.fw-bold');
            const priceEl = card.querySelector('.price-inr');

            if (!nameEl || !priceEl) {
                console.warn('Missing .fw-bold or .price-inr in card');
                return;
            }

            const name = nameEl.innerText;
            const price = parseInt(priceEl.innerText.replace('₹', ''));

            cartItems.push({ name, price });
            updateCartDisplay();
        });
    });
});
