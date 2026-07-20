// Panier stocké en localStorage
let cart = JSON.parse(localStorage.getItem('sentech-cart')) || [];

// Ajouter au panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Vérifier si le produit est déjà dans le panier
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`${product.name} ajouté au panier!`);
}

// Retirer du panier
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    displayCart();
}

// Modifier la quantité
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            displayCart();
        }
    }
}

// Sauvegarder le panier
function saveCart() {
    localStorage.setItem('sentech-cart', JSON.stringify(cart));
}

// Mettre à jour le badge du panier
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Afficher le panier
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Votre panier est vide</p>';
        document.getElementById('total-price').textContent = '0';
        return;
    }
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.emoji} ${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString('fr-FR')} FCFA × ${item.quantity}</div>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Supprimer</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    updateTotalPrice();
}

// Calculer le total
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-price').textContent = total.toLocaleString('fr-FR');
}

// Basculer l'affichage du panier
function toggleCart() {
    const cartSection = document.getElementById('cart-section');
    const productsSection = document.getElementById('products-section');
    
    if (cartSection.classList.contains('hidden')) {
        cartSection.classList.remove('hidden');
        productsSection.classList.add('hidden');
        displayCart();
    } else {
        cartSection.classList.add('hidden');
        productsSection.classList.remove('hidden');
    }
}

// Notification simple
function showNotification(message) {
    alert(message);
}

// Initialiser le panier au chargement
function initCart() {
    updateCartCount();
}