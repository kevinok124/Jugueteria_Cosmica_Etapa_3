import productController from '../controllers/product.js';

console.warn('🆗: Módulo PageHome cargado.');

class PageHome {

    static async renderTemplateCards(products) {
        const textoToRender = await fetch('/templates/card.hbs').then(r => r.text());
        const template = Handlebars.compile(textoToRender);
        const html = template({ products });
        document.querySelector('.cards-container').innerHTML = html;



        const buttons = document.querySelectorAll(".botonProducto");

        buttons.forEach(button => {
          button.onclick = function () {
            const cardTitle = this.dataset.productName;
            const cardPrice = parseFloat(this.dataset.productPrice); // Convertir a número flotante
            console.log("Título del producto:", cardTitle);
            console.log("Precio del producto:", cardPrice);
        
            // Verificar si el producto ya está en el carrito
            const cartTable = document.getElementById("cart-items-table");
            const existingItem = cartTable.querySelector(`tr[data-product-name="${cardTitle}"]`);
        
            if (existingItem) {
              // Si el producto ya existe, actualiza la cantidad y el precio total
              const quantityCell = existingItem.querySelector(".quantity-cell");
              const currentQuantity = parseInt(quantityCell.textContent);
              quantityCell.textContent = currentQuantity + 1;
        
              const totalCell = existingItem.querySelector(".total-cell");
              const currentTotal = parseFloat(totalCell.textContent.slice(2)); // Obtener el valor numérico actual sin el "$ "
              totalCell.textContent = "$ " + (currentTotal + cardPrice).toFixed(2); // Actualizar el precio total con 2 decimales
            } else {
              // Si el producto no existe, crea una nueva fila y agrega la información del producto
              const newRow = document.createElement("tr");
              newRow.dataset.productName = cardTitle;
        
              const textCell = document.createElement("td");
              const textContainer = document.createElement("div");
              textContainer.classList.add("card-text-container");
        
              const titleElement = document.createElement("h3");
              titleElement.classList.add("card-title");
              titleElement.textContent = cardTitle;
        
              const priceElement = document.createElement("div");
              priceElement.classList.add("price-card");
              priceElement.textContent = "$ " + cardPrice;
        
              textContainer.appendChild(titleElement);
              textContainer.appendChild(priceElement);
              textCell.appendChild(textContainer);
        
              const quantityCell = document.createElement("td");
              quantityCell.classList.add("quantity-cell");
              quantityCell.textContent = "1";
        
              const totalCell = document.createElement("td");
              totalCell.classList.add("total-cell");
              totalCell.textContent = "$ " + cardPrice.toFixed(2); // Mostrar el precio total con 2 decimales
        
              newRow.appendChild(textCell);
              newRow.appendChild(quantityCell);
              newRow.appendChild(totalCell);
              cartTable.appendChild(newRow);
            }
        
            // Calcular y mostrar el subtotal y el precio total de la compra
            updateTotalPrice();
          };
        });
        
        function updateTotalPrice() {
          const cartTable = document.getElementById("cart-items-table");
          const totalCells = cartTable.querySelectorAll(".total-cell");
          let subtotal = 0;
        
          totalCells.forEach(cell => {
            const currentTotal = parseFloat(cell.textContent.slice(2)); // Obtener el valor numérico actual sin el "$ "
            subtotal += currentTotal;
          });
        
          // Actualizar el valor del subtotal y el precio total de la compra en el modal
          const subtotalValue = document.getElementById("subtotal-value");
          const totalPriceValue = document.getElementById("total-price-value");
          subtotalValue.textContent = subtotal.toFixed(2);
          totalPriceValue.textContent = subtotal.toFixed(2);
        }
    }

    static async init () {
        console.log('PageHome.init()');

        const products = await productController.getProducts();
        PageHome.renderTemplateCards(products);
    

        console.log(`Se encontraron ${products.length} productos.`);
    }
}

export default PageHome;
