"use strict";
class ProductManager {
    products;
    constructor() {
        this.products = JSON.parse(localStorage.getItem('products') || '[]');
        this.initEventListeners();
        this.displayProducts();
        this.calculateTotalCost();
    }
    initEventListeners() {
        document.getElementById('productForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addProduct();
        });
        document.getElementById('search').addEventListener('input', () => {
            this.displayProducts();
        });
    }
    addProduct() {
        const name = document.getElementById('name').value;
        const price = parseInt(document.getElementById('price').value);
        const type = document.getElementById('type').value;
        const unit = document.getElementById('unit').value;
        const date = document.getElementById('date').value;
        const supplier = document.getElementById('supplier').value;
        const newProduct = { name, price, type, unit, date, supplier };
        this.products.push(newProduct);
        document.getElementById('productForm').reset();
        localStorage.setItem('products', JSON.stringify(this.products));
        this.displayProducts();
        this.calculateTotalCost();
    }
    displayProducts() {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(searchTerm));
        filteredProducts.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <strong>${product.name}</strong><br>
                Price: $${product.price.toFixed(1)}<br>
                Type: ${product.type}<br>
                Unit: ${product.unit}<br>
                Date of Arrival: ${product.date}<br>
                Supplier: ${product.supplier}<br>
                <button class="delete-button" onclick="productManager.deleteProduct(${index})">Delete</button>
            `;
            productList.appendChild(productItem);
        });
    }
    deleteProduct(index) {
        this.products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(this.products));
        this.displayProducts();
        this.calculateTotalCost();
    }
    calculateTotalCost() {
        const totalCost = this.products.reduce((total, product) => total + product.price, 0);
        document.getElementById('totalCost').textContent = `Total Cost: ${totalCost}`;
    }
}
const productManager = new ProductManager();
