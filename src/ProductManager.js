const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
class ProductManager {
    constructor(path) {
        this.path = path;
    }
    async readProducts() {
        try {
            const data = await readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }
    async writeProducts(products) {
        await writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
    }
    async addProduct(product) {
        const products = await this.readProducts();
        const id = products.length ? products[products.length - 1].id + 1 : 1;
        products.push({ id, ...product });
        await this.writeProducts(products);
    }
    async getProducts() {
        return await this.readProducts();
    }
    async getProductById(id) {
        const products = await this.readProducts();
        return products.find(product => product.id === id);
    }
    async updateProduct(id, updatedProduct) {
        const products = await this.readProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct, id };
            await this.writeProducts(products);
        }
    }
    async deleteProduct(id) {
        const products = await this.readProducts();
        const updatedProducts = products.filter(product => product.id !== id);
        await this.writeProducts(updatedProducts);
    }
}
module.exports = ProductManager;
