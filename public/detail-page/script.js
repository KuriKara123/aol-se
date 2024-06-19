var Mainimg = document.getElementById("Mainimg");
var smallimg = document.getElementsByClassName("small-img");
      
      smallimg[0].onclick = function(){
        Mainimg.src = smallimg[0].src;
      }
      smallimg[1].onclick = function(){
        Mainimg.src = smallimg[1].src;
      }
      smallimg[2].onclick = function(){
        Mainimg.src = smallimg[2].src;
      }
      smallimg[3].onclick = function(){
        Mainimg.src = smallimg[3].src;
      }


const openTrailer = () => {
    document.getElementById('trailerPopup').style.display = 'block';
}
    
const closeTrailerPopup = () => {
    document.getElementById('trailerPopup').style.display = 'none';
}

function addToList() {
    
    const name = document.getElementById('product-name').innerText;
    const priceText = document.getElementById('product-price').innerText;
    const price = parseFloat(priceText.replace('Rp.', '').replace('.', '').replace(',', '.'));
    const quantity = parseInt(document.getElementById('product-quantity').value);
    const imageSrc = document.getElementById('Mainimg').src;

    
    const subtotal = price * quantity;

    
    const product = {
        name,
        price,
        quantity,
        subtotal,
        imageSrc
    };

    
    let productList = JSON.parse(localStorage.getItem('productList')) || [];

    
    productList.push(product);

    
    localStorage.setItem('productList', JSON.stringify(productList));

    
    alert('Item successfully added to list!');
}


      