const close = document.querySelector(".close");
const open = document.querySelector(".ham");
const menu = document.querySelector(".menu");
close.addEventListener("click", () => {
  menu.style.visibility = "hidden";
});
open.addEventListener("click", () => {
  menu.style.visibility = "visible";
});


const productContainer = document.getElementById("productContainer");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");

function renderProducts(filterCategory = "all", sortType = "default") {
    let filteredProducts = products;

    if (filterCategory !== "all") {
        filteredProducts = products.filter(product => product.category === filterCategory);
    }

    if (sortType === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    productContainer.innerHTML = filteredProducts.map(product => `
        <div class="items">
            <div class="img"><img src="${product.image}" alt="${product.name}"></div>
            <div class="name">${product.name}</div>
            <div class="price">₹${product.price.toLocaleString()}</div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join("");
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    alert(`${product.name} added to cart!`);
}

function buyNow(productId) {
    const product = products.find(p => p.id === productId);

    const customerDetails = `
        <div class="modal" id="customerModal">
            <div class="modal-content">
                <h3>Buy Now: ${product.name}</h3>
                <form id="paymentForm">
                    <label for="customerName">Name:</label>
                    <input type="text" id="customerName" required><br>
                    
                    <label for="customerEmail">Email:</label>
                    <input type="email" id="customerEmail" required><br>
                    
                    <label for="customerAddress">Address:</label>
                    <textarea id="customerAddress" required></textarea><br>
                    
                    <label for="paymentMethod">Payment Method:</label>
                    <select id="paymentMethod" required>
                        <option value="card">Credit/Debit Card</option>
                        <option value="upi">UPI</option>
                        <option value="cod">Cash on Delivery</option>
                    </select><br>
                    
                    <button type="submit">Proceed to Payment</button>
                    <button type="button" onclick="closeModal()">Cancel</button>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", customerDetails);

    const paymentForm = document.getElementById("paymentForm");
    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("customerName").value;
        const email = document.getElementById("customerEmail").value;
        const address = document.getElementById("customerAddress").value;
        const paymentMethod = document.getElementById("paymentMethod").value;

        alert(`Thank you for your purchase, ${name}!\n\nProduct: ${product.name}\nPrice: ₹${product.price}\nPayment Method: ${paymentMethod}\nEmail Confirmation Sent to: ${email}`);
        closeModal();
    });
}

function closeModal() {
    const modal = document.getElementById("customerModal");
    modal.remove();
}

categoryFilter.addEventListener("change", (e) => {
    renderProducts(e.target.value, priceSort.value);
});

priceSort.addEventListener("change", (e) => {
    renderProducts(categoryFilter.value, e.target.value);
});


renderProducts();
