/**
 * Menu & Event Selection & WhatsApp Checkout Logic (Single Type Constraint)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Create Checkout Bar
    if (!document.querySelector('.cat-checkout-bar')) {
        const checkoutBar = document.createElement('div');
        checkoutBar.className = 'cat-checkout-bar';
        checkoutBar.innerHTML = `
            <div class="checkout-container">
                <div class="checkout-info">
                    <span class="selection-summary">Nothing Selected</span>
                    <span class="total-price">Total Estimate: ₦0</span>
                </div>
                <button class="cat-btn checkout-btn">
                    Book My Order Now <i class="fab fa-whatsapp"></i>
                </button>
            </div>
        `;
        document.body.appendChild(checkoutBar);
    }

    const checkoutBar = document.querySelector('.cat-checkout-bar');

    const updateUI = () => {
        const summarySpan = checkoutBar.querySelector('.selection-summary');
        const priceSpan = checkoutBar.querySelector('.total-price');
        const checkoutBtn = checkoutBar.querySelector('.checkout-btn');
        
        const selectedFoodElements = document.querySelectorAll('.cat-pricing-list.is-selected');
        const selectedEventElements = document.querySelectorAll('.cat-porfolio-section.is-selected');

        const itemCount = selectedFoodElements.length;
        const eventCount = selectedEventElements.length;

        let total = 0;
        selectedFoodElements.forEach(el => {
            const priceText = el.querySelector('.cat-price').textContent.replace(/[^\d]/g, '');
            total += parseInt(priceText) || 0;
        });

        let summaryText = "";
        let btnText = "Book My Order Now";

        if (itemCount > 0 && eventCount > 0) {
            summaryText = `${itemCount} Food Item${itemCount > 1 ? 's' : ''} + ${eventCount} Event Type${eventCount > 1 ? 's' : ''}`;
            btnText = "Complete Your Event Booking";
            priceSpan.style.display = 'block';
            priceSpan.textContent = `Food Total: ₦${total.toLocaleString()}`;
        } else if (itemCount > 0) {
            summaryText = `${itemCount} Food Item${itemCount > 1 ? 's' : ''} Selected`;
            btnText = "Checkout Your Order Now";
            priceSpan.style.display = 'block';
            priceSpan.textContent = `Total: ₦${total.toLocaleString()}`;
        } else if (eventCount > 0) {
            summaryText = `${selectedEventElements.length} Event Type${selectedEventElements.length > 1 ? 's' : ''} Selected`;
            btnText = "Book Your Event With Us";
            priceSpan.style.display = 'none';
        } else {
            summaryText = "Nothing Selected";
        }

        summarySpan.textContent = summaryText;
        checkoutBtn.innerHTML = `${btnText} <i class="fab fa-whatsapp"></i>`;

        if (itemCount > 0 || eventCount > 0) {
            checkoutBar.classList.add('is-active');
        } else {
            checkoutBar.classList.remove('is-active');
        }

        const filterParent = document.querySelector('.cat-filter');
        if (filterParent) {
            if (eventCount > 0) filterParent.classList.add('selection-active');
            else filterParent.classList.remove('selection-active');
        }
    };

    // 2. High-Priority Listener
    const handleSelection = (e) => {
        // --- EVENT SELECTION ---
        const eventCard = e.target.closest('.cat-porfolio-section');
        if (eventCard && !e.target.closest('.popup-gallery')) {
            e.stopPropagation();
            e.preventDefault();

            const isCurrentlySelected = eventCard.classList.contains('is-selected');
            const eventName = eventCard.querySelector('h4').textContent.trim();

            if (isCurrentlySelected) {
                // Allow deselection
                eventCard.classList.remove('is-selected');
            } else {
                // Check if another card with the SAME name is already selected
                let alreadySelected = false;
                document.querySelectorAll('.cat-porfolio-section.is-selected').forEach(selected => {
                    const selectedName = selected.querySelector('h4').textContent.trim();
                    if (selectedName === eventName) {
                        alreadySelected = true;
                    }
                });

                if (alreadySelected) {
                    alert(`Attention: You have already selected a ${eventName} event. Please deselect it first if you wish to choose a different image.`);
                    return; // EXIT WITHOUT SELECTING
                }

                // Final Selection
                eventCard.classList.add('is-selected');
                if (!eventCard.querySelector('.event-select-indicator')) {
                    const selectIndicator = document.createElement('div');
                    selectIndicator.className = 'event-select-indicator';
                    selectIndicator.innerHTML = '<i class="fas fa-calendar-check"></i>';
                    eventCard.appendChild(selectIndicator);
                }
            }
            updateUI();
            return;
        }

        // --- FOOD ITEM SELECTION ---
        const foodItem = e.target.closest('.cat-pricing-list');
        if (foodItem) {
            e.stopPropagation();
            e.preventDefault();
            const isCurrentlySelected = foodItem.classList.contains('is-selected');
            if (isCurrentlySelected) {
                foodItem.classList.remove('is-selected');
            } else {
                foodItem.classList.add('is-selected');
                if (!foodItem.querySelector('.select-indicator')) {
                    const selectIndicator = document.createElement('div');
                    selectIndicator.className = 'select-indicator';
                    selectIndicator.innerHTML = '<i class="fas fa-check"></i>';
                    foodItem.appendChild(selectIndicator);
                }
            }
            updateUI();
            return;
        }

        // --- WHATSAPP CHECKOUT BTN ---
        const checkoutBtn = e.target.closest('.checkout-btn');
        if (checkoutBtn) {
            const selectedFoodElements = document.querySelectorAll('.cat-pricing-list.is-selected');
            const selectedEventElements = document.querySelectorAll('.cat-porfolio-section.is-selected');

            if (selectedFoodElements.length === 0 && selectedEventElements.length === 0) return;
            
            let message = "Hi Royal Flave, I'd like to make a booking/order via your website:\n\n";

            if (selectedEventElements.length > 0) {
                message += `🏠 *EVENT TYPE(S):* \n`;
                selectedEventElements.forEach(el => {
                    message += `- ${el.querySelector('h4').textContent.trim()}\n`;
                });
                message += `\n`;
            }

            if (selectedFoodElements.length > 0) {
                message += `🍲 *SELECTED MENU:* \n`;
                let total = 0;
                selectedFoodElements.forEach((el, idx) => {
                    const name = el.querySelector('h4').textContent.trim();
                    const priceText = el.querySelector('.cat-price').textContent.replace(/[^\d]/g, '');
                    const price = parseInt(priceText) || 0;
                    message += `${idx + 1}. ${name} - ₦${price.toLocaleString()}\n`;
                    total += price;
                });
                message += `\n*Food Total: ₦${total.toLocaleString()}*\n`;
            }

            message += "\nPlease let me know availability and next steps.";
            window.open(`https://wa.me/2347077195098?text=${encodeURIComponent(message)}`, '_blank');
        }
    };

    document.addEventListener('click', handleSelection, true);
    console.log("🛒 Selection System (Single-Type Lock) Ready.");
});
