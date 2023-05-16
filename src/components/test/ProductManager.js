const fs = require('fs').promises;
const EventEmitter = require('events');

class ProductManager extends EventEmitter {
    constructor(path) {
        super();
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
        product.id = id;
        products.push(product);
        await this.writeProducts(products);
        this.emit('productCreated', product);
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
            updatedProduct.id = products[index].id;
            products[index] = updatedProduct;
            await this.writeProducts(products);
            this.emit('productUpdated', updatedProduct);
        }
    }

    deleteProduct = async (id) => {
        const products = await this.readProducts();
        const updatedProducts = products.filter(product => product.id !== id);
        await this.writeProducts(updatedProducts);
        this.emit('productDeleted', id);
    }
}

module.exports = ProductManager;
