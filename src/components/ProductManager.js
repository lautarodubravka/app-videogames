const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    readProducts = async () => {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    writeProducts = async (products) => {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
    }

    addProduct = async (product) => {
        const products = await this.readProducts();
        const id = products.length ? products[products.length - 1].id + 1 : 1;
        products.push({ id, ...product });
        await this.writeProducts(products);
    }

    getProducts = async () => {
        return await this.readProducts();
    }

    getProductById = async (id) => {
        const products = await this.readProducts();
        return products.find(product => product.id === id);
    }

    updateProduct = async (id, updatedProduct) => {
        const products = await this.readProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct, id };
            await this.writeProducts(products);
        }
    }

    deleteProduct = async (id) => {
        const products = await this.readProducts();
        const updatedProducts = products.filter(product => product.id !== id);
        await this.writeProducts(updatedProducts);
    }
}
addProduct = async (product) => {
    const products = await this.readProducts();
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    product.id = id; // add id to product
    products.push(product);
    await this.writeProducts(products);
}

updateProduct = async (id, updatedProduct) => {
    const products = await this.readProducts();
    const index = products.findIndex(product => product.id === id);

    if (index !== -1) {
        updatedProduct.id = products[index].id; // keep the original id
        products[index] = updatedProduct;
        await this.writeProducts(products);
    }
}

deleteProduct = async (id) => {
    const products = await this.readProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    await this.writeProducts(updatedProducts);
}

module.exports = ProductManager;
