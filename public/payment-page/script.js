document.addEventListener('DOMContentLoaded', function () {
    const productList = JSON.parse(localStorage.getItem('productList')) || [];
    const subtotalElement = document.getElementById('subtotal-value');

    
    let subtotal1 = 0;
    let subtotal = 0;
    productList.forEach(product => {
        subtotal1 += product.price * product.quantity;
        subtotal = subtotal1 + subtotal1 * 0.05;
    });

    
    subtotalElement.textContent = `Rp.${subtotal.toLocaleString('id-ID')},00`;

    
    document.getElementById('checkout-form').addEventListener('submit', function (e) {
        e.preventDefault();

        
        if (!this.checkValidity()) {
            alert('Please fill out all fields correctly.');
            return;
        }

        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            date: document.getElementById('date').value,
            address: document.getElementById('address').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value,
            cardName: document.getElementById('card-name').value,
            cardNumber: document.getElementById('card-number').value,
            expMonth: document.getElementById('exp-month').value,
            expYear: document.getElementById('exp-year').value,
            cvv: document.getElementById('cvv').value,
            productList: productList,
            subtotal: subtotal,
            orderDate: new Date().toISOString().split('T')[0]
        };

        let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
        orderHistory.push(formData);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

        
        localStorage.removeItem('productList');

        
        alert('Transaction purchased, you can check on your profile');
        window.location.href = '../profile-page/profile.html';
    });
});
