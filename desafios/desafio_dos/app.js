const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        // Inicializar el archivo si no existe
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify([]));
        }
    }

    readProducts() {
        const products = fs.readFileSync(this.path, 'utf8');
        return JSON.parse(products);
    }

    writeProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        const products = this.readProducts();
        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        products.push(newProduct);
        this.writeProducts(products);
    }

    getProducts() {
        return this.readProducts();
    }

    getProductById(id) {
        const products = this.readProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updateFields) {
        const products = this.readProducts();
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex === -1) return null;

        products[productIndex] = { ...products[productIndex], ...updateFields };
        this.writeProducts(products);
        return products[productIndex];
    }

    deleteProduct(id) {
        let products = this.readProducts();
        products = products.filter(product => product.id !== id);
        this.writeProducts(products);
    }
}


const manager = new ProductManager('./products.json');

// Agregar productos
manager.addProduct({ title: 'Kettlebell 4kg', description: 'Kettlebell de 4 kilos', price: 20, thumbnail: 'ruta/a/imagen4kg.jpg', code: 'KB4', stock: 10 });
manager.addProduct({ title: 'Kettlebell 8kg', description: 'Kettlebell de 8 kilos', price: 30, thumbnail: 'ruta/a/imagen8kg.jpg', code: 'KB8', stock: 10 })
manager.addProduct({ title: 'Kettlebell 12kg', description: 'Kettlebell de 12 kilos', price: 35, thumbnail: 'ruta/a/imagen12kg.jpg', code: 'KB12', stock: 10 })


// Obtener todos los productos
console.log(manager.getProducts());

// Actualizar un producto
manager.updateProduct(1, { price: 22, stock: 12 });

// Eliminar un producto
manager.deleteProduct(1);

