/**
 * Royal Flave – order.js
 * Form validation, add-to-cart feedback, submission messages
 */
(function () {
  'use strict';

  // Add to Cart buttons (no payment – show feedback)
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.add-to-cart-btn');
    if (!btn) return;
    e.preventDefault();
    var name = btn.getAttribute('data-meal-name') || 'Item';
    var price = btn.getAttribute('data-price');
    var msg = 'Added “‘ + name + '” to your order. Proceed to checkout when ready.';
    if (price) msg += ' (₦' + Number(price).toLocaleString() + ')';
    showOrderMessage(msg, 'success');
  });

  function showOrderMessage(text, type) {
    type = type || 'info';
    var existing = document.getElementById('fn-order-message');
    if (existing) existing.remove();
    var div = document.createElement('div');
    div.id = 'fn-order-message';
    div.className = 'fn-order-message fn-order-message--' + type;
    div.setAttribute('role', 'alert');
    div.textContent = text;
    div.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);padding:12px 24px;background:#333;color:#fff;border-radius:8px;z-index:9999;max-width:90%;box-shadow:0 4px 12px rgba(0,0,0,0.2);';
    if (type === 'success') div.style.background = '#c41e3a';
    document.body.appendChild(div);
    setTimeout(function () { div.remove(); }, 4000);
  }

  // Form validation helpers for order/catering/feedback forms
  window.FreshNigerForms = {
    validateRequired: function (fields) {
      var valid = true;
      fields.forEach(function (id) {
        var el = document.getElementById(id) || document.querySelector('[name="' + id + '"]');
        if (!el) return;
        var wrap = el.closest('.cat-input-wrap') || el.closest('.input-wrap');
        if (wrap) wrap.classList.remove('error');
        if (!el.value || !el.value.trim()) {
          valid = false;
          if (wrap) wrap.classList.add('error');
        }
      });
      return valid;
    },
    showSubmitMessage: function (message, isError) {
      showOrderMessage(message, isError ? 'error' : 'success');
    }
  };
})();
