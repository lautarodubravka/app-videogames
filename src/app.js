const ProductManager = require('./ProductManager');
const path = './products.json';
const manager = new ProductManager(path);
(async () => {
    await manager.addProduct({
        title: 'Cyberpunk 2077',
        description: 'Cyberpunk RPG ambientado en un futuro distópico.',
        price: 59.99,
        thumbnail: 'https://i.blogs.es/b109e9/cyberpunk2077-johnny-v-rgb_en/1366_2000.jpg',
        code: 'CP2077',
        stock: 100
    });
    console.log(await manager.getProducts());
    console.log(await manager.getProductById(1));
    await manager.updateProduct(1, {
        title: 'Cyberpunk 2077 - Edición mejorada',
        price: 69.99
    });
    console.log(await manager.getProducts());
    await manager.deleteProduct(1);
    console.log(await manager.getProducts());
})();
