document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    
    if (userData && userData.name) {
        const username = userData.name;
        document.getElementById('greeting').textContent = `Hello, ${username}! Welcome to the QuickPop.`;
        document.getElementById('profileName').textContent = username;
    } else {
        
        window.location.href = "../login-page/login.html";
    }

    
    const profilePic = localStorage.getItem('profilePic');
    if (profilePic) {
        document.getElementById('profilePreview').src = profilePic;
    }

    
    const profileBg = localStorage.getItem('profileBg');
    if (profileBg) {
        document.getElementById('profileBox').style.backgroundImage = `url(${profileBg})`;
    }

    
    document.getElementById('changePictureLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('profilePic').click();
    });

    document.getElementById('profilePic').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            document.getElementById('profilePreview').src = imageUrl;
            localStorage.setItem('profilePic', imageUrl);
        };
        reader.readAsDataURL(file);
    });

    
    document.getElementById('changeBackgroundLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('backgroundInput').click();
    });

    document.getElementById('backgroundInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            document.getElementById('profileBox').style.backgroundImage = `url(${imageUrl})`;
            localStorage.setItem('profileBg', imageUrl);
        };
        reader.readAsDataURL(file);
    });

    
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

    
    if (orderHistory.length > 0) {
        const orderContainer = document.getElementById('orderContainer');

        
        orderHistory.forEach(order => {

            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');

            order.productList.forEach(product => {
                const productImage = document.createElement('img');
                productImage.src = product.imageSrc; 
                productImage.alt = product.name;
                productImage.classList.add('order-product-image');
                orderItem.appendChild(productImage);

                const orderDetails = document.createElement('div');
                orderDetails.classList.add('order-details');

                const productName = document.createElement('h4');
                productName.textContent = product.name;
                orderDetails.appendChild(productName);

                const quantity = document.createElement('p');
                quantity.textContent = `Quantity: ${product.quantity}`;
                orderDetails.appendChild(quantity);

                const subtotal = document.createElement('p');
                subtotal.textContent = `Subtotal: Rp.${(product.price * product.quantity).toLocaleString('id-ID')},00`;
                orderDetails.appendChild(subtotal);

                const date = document.createElement('p');
                date.textContent = `Date: ${order.date}`;
                orderDetails.appendChild(date);

                orderItem.appendChild(orderDetails);
            });

            orderContainer.appendChild(orderItem);
        });
    } else {
        
        const orderContainer = document.getElementById('orderContainer');
        orderContainer.innerHTML = '<p>No orders found</p>';
    }
});


document.getElementById('logoutButton').addEventListener('click', function() {
    // Perform logout operations like clearing session storage or cookies
    // For example: sessionStorage.clear();

    // Redirect to the landing page
    window.location.href = '../landing-page/landing.html'; // Replace with the actual path to your landing page
});