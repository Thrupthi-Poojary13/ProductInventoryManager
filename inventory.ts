interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    tags?: string[];
}

interface DiscountedProduct extends Product {
    discountPercent: number;
}

let products: Product[] = [
    {
        id: 1,
        name: "Laptop",
        price: 55000,
        inStock: true,
        tags: ["Electronics", "Computer"]
    },
    {
        id: 2,
        name: "Mouse",
        price: 800,
        inStock: true,
        tags: ["Accessory"]
    },
    {
        id: 3,
        name: "Keyboard",
        price: 1500,
        inStock: false,
        tags: ["Accessory"]
    },
    {
        id: 4,
        name: "Monitor",
        price: 12000,
        inStock: true,
        tags: ["Display"]
    }
];

function getAvailableProducts(products: Product[]): Product[] {
    return products.filter(product => product.inStock);
}

function calculateDiscount(
    price: number,
    discountPercent: number = 10
): number {
    return price - (price * discountPercent / 100);
}

function applyDiscountToProducts(
    products: Product[]
): DiscountedProduct[] {

    const discountPercent: number = 10;

    return products.map(product => ({
        ...product,
        price: calculateDiscount(product.price, discountPercent),
        discountPercent: discountPercent
    }));
}

function displayProducts(): void {

    const tableBody =
        document.getElementById("productTableBody") as HTMLElement;

    tableBody.innerHTML = "";

    products.forEach(product => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>₹${product.price}</td>
            <td>${product.inStock ? "Yes" : "No"}</td>
            <td>${product.tags?.join(", ") || "None"}</td>
        `;

        tableBody.appendChild(row);
    });

    displayAvailableProducts();
}

function displayAvailableProducts(): void {

    const availableProducts =
        getAvailableProducts(products);

    const container =
        document.getElementById("availableProducts") as HTMLElement;

    container.innerHTML = "";

    availableProducts.forEach(product => {

        const div = document.createElement("div");

        div.className = "available";

        div.innerHTML =
            `<strong>${product.name}</strong> - ₹${product.price}`;

        container.appendChild(div);
    });
}

function addProduct(): void {

    const nameInput =
        document.getElementById("productName") as HTMLInputElement;

    const priceInput =
        document.getElementById("productPrice") as HTMLInputElement;

    const stockInput =
        document.getElementById("productStock") as HTMLInputElement;

    const tagsInput =
        document.getElementById("productTags") as HTMLInputElement;

    const name: string = nameInput.value.trim();

    const price: number = Number(priceInput.value);

    const inStock: boolean = stockInput.checked;

    const tags: string[] = tagsInput.value
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

    if (name === "" || price <= 0) {

        alert("Please enter a valid product name and price.");

        return;
    }

    const newProduct: Product = {
        id: products.length + 1,
        name: name,
        price: price,
        inStock: inStock,
        tags: tags
    };

    products.push(newProduct);

    displayProducts();

    nameInput.value = "";
    priceInput.value = "";
    stockInput.checked = false;
    tagsInput.value = "";
}

displayProducts();