window.onload = () => {
    fetchProducts("https://dummyjson.com/products");
};

let allProducts = [];
let allBrands = [];

function fetchProducts(apiUrl) {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            allProducts = data.products;
            allBrands = [...new Set(allProducts.map(p => p.brand))];
            populateBrandDropdown();
            applyFilters();
        })
        .catch(err => {
            console.error("Error fetching products:", err);
        });
}

function populateBrandDropdown() {
    const brandSelect = document.getElementById("brandSelect");
    if (!brandSelect) return;
    while (brandSelect.options.length > 1) {
        brandSelect.remove(1);
    }
    allBrands.forEach(brand => {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    });
}

function applyFilters() {
    const brand = document.getElementById("brandSelect")?.value || "";
    const minPrice = parseFloat(document.getElementById("minPrice")?.value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice")?.value) || Infinity;
    let filtered = allProducts.filter(product => {
        const matchesBrand = !brand || product.brand === brand;
        const matchesMin = product.price >= minPrice;
        const matchesMax = product.price <= maxPrice;
        return matchesBrand && matchesMin && matchesMax;
    });
    displayProducts(filtered);
}

function searchProducts() {
    const query = document.getElementById("searchInput").value.trim();
    if (query !== "") {
        fetchProducts(`https://dummyjson.com/products/search?q=${query}`);
    } else {
        fetchProducts("https://dummyjson.com/products");
    }
}

function displayProducts(products) {
    const container = document.getElementById("productsContainer");
    container.innerHTML = "";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p class="price"><strong>Price:</strong> $${product.price}</p>
            <p><strong>Rating:</strong> ${product.rating}</p>
        `;
        container.appendChild(productDiv);
    });
}

function sortProducts() {
    const sortValue = document.getElementById("sortSelect").value;
    let sortedProducts = Array.from(document.getElementById("productsContainer").children).map(card => {
        const title = card.querySelector("h3").textContent;
        return allProducts.find(p => p.title === title);
    });
    switch (sortValue) {
        case "price-asc":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case "rating-asc":
            sortedProducts.sort((a, b) => a.rating - b.rating);
            break;
        case "rating-desc":
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
    }
    displayProducts(sortedProducts);
}
    