import productController from '../controllers/product.js';

console.warn('🆗: Módulo PageHome cargado.');

class PageHome {

    static async renderTemplateCards(products) {
        const textoToRender = await fetch('/templates/card.hbs').then(r => r.text());
        const template = Handlebars.compile(textoToRender);
        const html = template({ products });
        document.querySelector('.cards-container').innerHTML = html;
    }

    static async init () {
        console.log('PageHome.init()');

        const products = await productController.getProducts();
        PageHome.renderTemplateCards(products);
    
        console.log(`Se encontraron ${products.length} productos.`);

    }
}

export default PageHome;
