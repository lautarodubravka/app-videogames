document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();
  
        // Obtener el ID del producto del atributo data-id del botón
        let productId = this.getAttribute("data-id");
  
        // solicitud HTTP POST a tu API para agregar el producto al carrito
        fetch('/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({productId: productId})
        }).then(response => {
          if(response.ok) {
            alert("Producto añadido al carrito");
          } else {
            alert("Error al añadir producto al carrito");
          }
        });
      });
    });
  });
  