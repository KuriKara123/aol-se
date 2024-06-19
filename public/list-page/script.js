document.addEventListener('DOMContentLoaded', function() {
    const productList = JSON.parse(localStorage.getItem('productList')) || [];
    const listItems = document.getElementById('list-items');
    const subtotalAmount = document.getElementById('subtotal-amount');
    const taxAmount = document.getElementById('tax-amount');
    const totalAmount = document.getElementById('total-amount');
    let subtotal = 0;

    productList.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><i class="far fa-times-circle" onclick="removeItem(${index})"></i></td>
            <td><img src="${product.imageSrc}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>Rp.${product.price.toLocaleString('id-ID')},00</td>
            <td><input type="number" value="${product.quantity}" onchange="updateQuantity(${index}, this.value)"></td>
            <td>Rp.${(product.price * product.quantity).toLocaleString('id-ID')},00</td>
        `;
        listItems.appendChild(row);
        subtotal += product.price * product.quantity;
    });

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    subtotalAmount.textContent = `Rp.${subtotal.toLocaleString('id-ID')},00`;
    taxAmount.textContent = `Rp.${tax.toLocaleString('id-ID')},00`;
    totalAmount.textContent = `Rp.${total.toLocaleString('id-ID')},00`;
});

function removeItem(index) {
    const productList = JSON.parse(localStorage.getItem('productList')) || [];
    productList.splice(index, 1);
    localStorage.setItem('productList', JSON.stringify(productList));
    window.location.reload();
}

function updateQuantity(index, quantity) {
    const productList = JSON.parse(localStorage.getItem('productList')) || [];
    productList[index].quantity = parseInt(quantity, 10);
    localStorage.setItem('productList', JSON.stringify(productList));
    window.location.reload();
}
