let cartItems = [];

function updateCartDisplay() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    const cartModalBody = document.querySelector('.modal-body');
    const lblCount = document.getElementById('lblCount');

   if(cartModalBody) cartModalBody.innerHTML = '';

    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('mb-3');
        itemDiv.innerHTML = `<p><strong>${item.name}</strong> - ₹${item.price.toFixed(2)}   <span><button class="btn btn-close float-end" onclick="removeItem(${index})"></button></span>`;
        cartModalBody.appendChild(itemDiv);
    });

    lblCount.innerText = cartItems.length;
}
function removeItem(index) {
    cartItems.splice(index, 1);
    updateCartDisplay();
  }

document.addEventListener('DOMContentLoaded', () => {

    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartDisplay();
    }

    const cartButtons = document.querySelectorAll(".CartBtn");

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.border');
            if (!card) {
                console.log('Could not find .border container for button');
                return;
            }

            const nameEl = card.querySelector('.fw-bold');
            const priceEl = card.querySelector('.price-inr');

            const name = nameEl.innerText.trim();
            const price = parseFloat(priceEl.innerText.replace(/[₹,]/g, '').trim());

            if (isNaN(price)) {
                console.warn('Price could not be parsed:', priceEl.innerText);
                return;
            }

            cartItems.push({ name, price });
            updateCartDisplay();
        });
    });
});






