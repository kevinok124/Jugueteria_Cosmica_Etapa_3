import productController from '/js/controllers/product.js';

console.warn('🆗: Módulo PageCreate cargado.');

class PageCreate {

    static productsTableContainer;

    static async deleteProduct(e) {
        if (!confirm('¿Estás seguro de querer eliminar el producto?')) {
            return false;
        }
        const row = e.target.closest('tr');
        const _id = row.querySelector('td[data-product-property="_id"]').innerHTML;
        const deletedProduct = await productController.deleteProduct(_id);
        
        PageCreate.loadTable();
        return deletedProduct;
    }

    static async getProductFromRow(row) {
        const rowCells = row.children;
        const product = {};
        for (const cell of rowCells) {
            if (cell.dataset.productProperty) {
                product[cell.dataset.productProperty] = cell.innerHTML;
            }
        }
        const _id = row.querySelector('td[data-product-property="_id"]').innerHTML;
        const updateProduct = await productController.updateProduct(_id,product);
        PageCreate.loadTable();
        return updateProduct;
    }

    static async completeForm(e) {
        const row = e.target.closest('tr');
        const productToEdit = await PageCreate.getProductFromRow(row);
        console.log('productToEdit:', productToEdit);
    }

    static async handleTableClick(e) {
        if (e.target.classList.contains('btn-delete')) {
            const deletedProduct = await PageCreate.deleteProduct(e);
            console.log('deletedProduct:', deletedProduct);
            return;
        }

        if (e.target.classList.contains('btn-edit')) {
            console.log("guardar");
            PageCreate.completeForm(e);

            alert('Se han guardado únicamente los cambios de la fila del botón presionado.');
            /* window.location.reload(); */

            return;
        }
    }

    static async addTableEvents() {
        PageCreate.productsTableContainer.removeEventListener('click', PageCreate.handleTableClick);
        PageCreate.productsTableContainer.addEventListener('click', PageCreate.handleTableClick);
    }


    static async renderTemplateTable(products) {
        const hbsFile = await fetch('templates/products-table.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        PageCreate.productsTableContainer.innerHTML = html;
    }

    static async loadTable() {
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos.`);
        PageCreate.renderTemplateTable(products);
    }

    static async prepareTable() {
        PageCreate.productsTableContainer = document.querySelector('.products-table-container');
        await PageCreate.loadTable();
        PageCreate.addTableEvents();
    }

    static async init () {
    console.log('PageCreate.init()');

        PageCreate.productsTableContainer = document.querySelector('.products-table-container');
        await PageCreate.loadTable();
        PageCreate.addTableEvents();

        const guardarNuevo = document.getElementById('guardarNuevo');
        const nombre = document.getElementById('name');
        const price = document.getElementById('price');
        const stock = document.getElementById('stock');
        const brand = document.getElementById('brand');
        const category = document.getElementById('category');
        const shortDescription = document.getElementById('short-description');

        nombre.addEventListener('input', validarFormulario);
        price.addEventListener('input', validarFormulario);
        stock.addEventListener('input', validarFormulario);
        brand.addEventListener('input', validarFormulario);
        category.addEventListener('input', validarFormulario);
        guardarNuevo.addEventListener('click', crearNuevoProducto);

        function validarFormulario() {

            if (nombre.value.trim() !== '' && price.value.trim() !== '' && stock.value.trim() !== '' && brand.value.trim() !== '' && category.value.trim() !== '') {
                guardarNuevo.disabled = false;
            } else {
                guardarNuevo.disabled = true;
            }
        } 

        async function crearNuevoProducto() {
            const product = {
                name: nombre.value,
                price: price.value,
                stock: stock.value,
                brand: brand.value,
                category: category.value,
                shortDescription: shortDescription.value
            };
        
            const creado = await productController.saveProduct(product);
            if (creado) {
                alert('Producto creado exitosamente.');
                // Si deseas hacer algo más después de crear el producto, puedes agregarlo aquí.
            } else {
                alert('Hubo un error al crear el producto.');
            }
        }

        PageCreate.prepareTable();
    }
}

export default PageCreate;
