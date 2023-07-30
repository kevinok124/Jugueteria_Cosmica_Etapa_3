
class Main {

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text());
    }

    getIdFromHash() {
        let id = location.hash.slice(1);
        if (id[0] === '/') {
            id = id.slice(1);
        }
        return id || 'home';
    }

    getViewUrlFromId(id) {
        return `views/${id}.html`;
    }

    getModuleUrlFromId(id) {
        return `./modules/${id}.js`;
    }

    setActiveLink(id) {
        const links = document.querySelectorAll('.main-nav__link');
        links.forEach(link => {
            if (link.getAttribute('href') === `#/${id}`) {
                link.classList.add('main-nav__link--active');
                link.ariaCurrent = 'page';
            } else {
                link.classList.remove('main-nav__link--active');
                link.removeAttribute('aria-current');
            }
        });
    }

    async initJS(id) {
        const moduleUrl = this.getModuleUrlFromId(id);
        try {
            const {default: module} = await import(moduleUrl);
            if (typeof module.init !== 'function') {
                console.error(`El módulo ${id} no posee un método init().`);
                return;
            }
            module.init();
        } catch (error) {
            console.error(`No se pudo importar el módulo ${moduleUrl}.`);
        }
    }

    async loadTemplate() {
        const id = this.getIdFromHash();
        
        const viewUrl = this.getViewUrlFromId(id);
        const viewContent = await this.ajax(viewUrl);
        document.querySelector('main').innerHTML = viewContent;

        this.setActiveLink(id);

        this.initJS(id);
    }

    async loadTemplates() {
        this.loadTemplate();
        window.addEventListener('hashchange', () => this.loadTemplate());
    }

    async start() {
        await this.loadTemplates();
    }
}

const main = new Main();
main.start();




/* ____________________  proyecto ex etapa 2*/


const name = 'Kevin Leonel Okulczyk';
const proyecto = 'Proyecto Integrador: Juguetería Cósmica';

document.title = `${document.title} - ${name} - ${proyecto}`;
const jsOfSinglePages = ['home', 'create', 'contact', 'about-us'];
const navbar = document.querySelector("nav");
let btnState = false;
const modal = document.querySelector("#modal");
const modalTable = document.querySelector('.cart-modal-container');

//BTN CART
const btnCart = document.querySelector('.btn-cart-toggle');
const cartContainer = document.querySelector('.cart-modal-container');

let isCartVisible = true;
btnCart.addEventListener('click', function(){
    if(isCartVisible){
        console.log('Abrir carrito');
        isCartVisible = false;
        btnCart.classList.add('btn-pressed');
        cartContainer.classList.add('cart-visible');
    } else{
        console.log("Cerrar carrito");
        isCartVisible = true;
        btnCart.classList.remove('btn-pressed');
        cartContainer.classList.remove('cart-visible');
    }
}) 

  //                 CLOSE CART FUNCTION
function closeCart(){
    if(!isCartVisible){
        console.log("Cerrar carrito");
        isCartVisible = true;
        btnCart.classList.remove('btn-pressed');
        cartContainer.classList.remove('cart-visible');
    }
} 

window.addEventListener('keydown', function(ev){
    if (ev.key === 'Escape'&& !isCartVisible){    
        closeCart();
    };
})


const btnCloseCart = document.querySelector('.close-button');
    btnCloseCart.addEventListener('click', function(){
        if (!isCartVisible){
            closeCart()
        }
    })

// Cerrar el modal haciendo click fuera del mismo //

// Obtener el modal
var body = document.getElementsByClassName("class-body")[0];
var header = document.getElementsByClassName("class-header")[0];
var footer = document.getElementsByClassName("class-footer")[0];

// Cuando el usuario haga clic fuera del modal, cerrarlo
window.onclick = function(event) {
    if (event.target == body) {
        closeCart()
    } else{
        if(event.target == header){
            closeCart()
    } else if (event.target == footer){
        closeCart()
    } else {

    }
    }
}