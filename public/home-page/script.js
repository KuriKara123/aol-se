document.addEventListener('DOMContentLoaded', function() {
    
    const searchBar = document.getElementById('searchBar');
            const productContainer = document.querySelector('.pro-container');
            const products = Array.from(productContainer.getElementsByClassName('pro'));
            const filterButtons = document.querySelectorAll('.filter-button');

            searchBar.addEventListener('input', (e) => {
                const searchString = e.target.value.toLowerCase();
                products.forEach(product => {
                    const productName = product.querySelector('h5').textContent.toLowerCase();
                    if (productName.includes(searchString)) {
                        product.style.display = '';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filter = button.getAttribute('data-filter');
                    filterProducts(filter);
                });
            });

            function filterProducts(filter) {
                products.forEach(product => {
                    const category = product.querySelector('span').textContent.toLowerCase();
                    if (filter === 'all' || category === filter) {
                        product.style.display = '';
                    } else {
                        product.style.display = 'none';
                    }
                });
            }
        });