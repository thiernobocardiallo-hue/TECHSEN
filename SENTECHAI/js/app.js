// Application principale

// Initialiser l'app au chargement
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    initCart();
    setupEventListeners();
});

// Event listeners
function setupEventListeners() {
    // Rien à ajouter pour maintenant
}

// Fonction de checkout
function checkout() {
    if (cart.length === 0) {
        alert('Votre panier est vide!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Créer un résumé de la commande
    let orderSummary = 'RÉSUMÉ DE LA COMMANDE\n\n';
    cart.forEach(item => {
        orderSummary += `${item.name} × ${item.quantity} = ${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA\n`;
    });
    orderSummary += `\n━━━━━━━━━━━━━━━━━━━━━━\nTOTAL: ${total.toLocaleString('fr-FR')} FCFA\n`;

    // Pour maintenant, on affiche juste un message
    // Plus tard, tu pourras intégrer Stripe ou Wave
    alert(orderSummary + '\n\nMerci pour votre commande!\n\nVous recevrez bientôt une confirmation à votre téléphone.\n\nContact: +221 70 347 97 65');
    
    // Vider le panier après confirmation
    cart = [];
    saveCart();
    updateCartCount();
    toggleCart();
    displayCart();
}

// Fonction de recherche (bonus)
function searchProducts(query) {
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );
    
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Aucun produit trouvé</p>';
        return;
    }
    
    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <p class="product-price">${product.price.toLocaleString('fr-FR')} FCFA</p>
                <button class="btn btn-secondary" onclick="addToCart(${product.id})">
                    Ajouter au panier
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

console.log('✅ SENTECH App chargée avec succès!');