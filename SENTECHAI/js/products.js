const products = [
    {
        id: 1,
        name: "AirPods Pro",
        price: 45000,
        description: "Écouteurs sans fil premium avec ANC",
        emoji: "🎧"
    },
    {
        id: 2,
        name: "Câble USB-C",
        price: 8000,
        description: "Câble de charge rapide 2m",
        emoji: "🔌"
    },
    {
        id: 3,
        name: "Batterie Externe",
        price: 25000,
        description: "20000mAh - Charge rapide",
        emoji: "🔋"
    },
    {
        id: 4,
        name: "Chargeur Rapide",
        price: 15000,
        description: "65W - Compatible tous appareils",
        emoji: "⚡"
    },
    {
        id: 5,
        name: "Écran Protecteur",
        price: 5000,
        description: "Verre trempé pour téléphone",
        emoji: "🛡️"
    },
    {
        id: 6,
        name: "Coque Téléphone",
        price: 12000,
        description: "Protection anti-choc premium",
        emoji: "📱"
    },
    {
        id: 7,
        name: "Support Téléphone",
        price: 7000,
        description: "Support ajustable pour bureau",
        emoji: "🎯"
    },
    {
        id: 8,
        name: "Hub USB 7 ports",
        price: 35000,
        description: "Expansion rapide de vos ports",
        emoji: "🔗"
    }
];

// Fonction pour afficher les produits
function displayProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    products.forEach(product => {
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

function showProducts() {
    document.getElementById('products-section').classList.remove('hidden');
    document.getElementById('cart-section').classList.add('hidden');
}