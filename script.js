
const products = [
    {
        id: 1,
        name: "Headphones",
        price: 799,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
        id: 3,
        name: "Shoes",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        id: 4,
        name: "Backpack",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    }
];

let cart = [];

function displayProducts(list = products) {
    document.getElementById("products").innerHTML = list.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join("");
}

function addToCart(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    } else {
        const product = products.find(product => product.id === id);
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);
    updateCart();
}

function updateCart() {
    const count = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("count").textContent = count;
    document.getElementById("total").textContent = total;

    const cartItems = document.getElementById("cart-items");

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-row">
            <span>${item.name} × ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">
                Remove
            </button>
        </div>
    `).join("");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order total: ₹" +
        cart.reduce((sum, item) =>
            sum + item.price * item.quantity, 0
        ) +
        "\nDemo checkout only. No real payment was made."
    );
}

document.getElementById("search").addEventListener("input", function () {
    const query = this.value.toLowerCase();

    displayProducts(
        products.filter(product =>
            product.name.toLowerCase().includes(query)
        )
    );
});

displayProducts();
updateCart();
