// Get product ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (productId && products[productId]) {
    const product = products[productId];
    document.title = product.title;
    document.querySelector('.product-title').textContent = product.title;
    
    document.querySelector('.price').textContent = `$${product.price.toFixed(2)}`;
    document.querySelector('.monthly-price').textContent = `$${product.monthlyPrice.toFixed(2)}/mo. for 12 mo.*`;
    
    document.querySelector('.main-image img').src = product.mainImage;
    document.querySelector('.main-image img').alt = product.title;
    
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (product.thumbnails[index]) {
            thumb.querySelector('img').src = product.thumbnails[index];
        }
    });

    document.querySelector('.color-label').textContent = `Color - ${product.selectedColor}`;

    const colorOptionsContainer = document.querySelector('.color-options');
    colorOptionsContainer.innerHTML = '';
    
    product.colors.forEach((color, index) => {
        const button = document.createElement('button');
        button.className = index < 7 ? 'color-option' : 'color-option-row2';
        if (color.name === product.selectedColor) {
            button.classList.add('selected');
        }
        button.style.backgroundColor = color.hex;
        button.setAttribute('aria-label', color.name);
        button.setAttribute('data-color', color.name);

        button.addEventListener('click', function() {
            document.querySelectorAll('.color-option, .color-option-row2').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');
            document.querySelector('.color-label').textContent = `Color - ${color.name}`;
        });
        
        colorOptionsContainer.appendChild(button);
    });

    const sizeSelect = document.getElementById('size');
    sizeSelect.innerHTML = '';
    product.sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size.toLowerCase().replace(/\s+/g, '-');
        option.textContent = size;
        sizeSelect.appendChild(option);
    });
    
} else {
    console.error('Invalid product ID');
    document.querySelector('.product-container').innerHTML = '<div style="text-align: center; padding: 50px;"><h1>Product not found</h1><p><a href="index.html">Return to homepage</a></p></div>';
}
document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const imgSrc = this.querySelector('img').src;
        document.querySelector('.main-image img').src = imgSrc;
    });
});
