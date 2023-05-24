
  // Espera a que el documento se haya cargado completamente
  document.addEventListener('DOMContentLoaded', function() {
    // Captura todos los enlaces que apunten a anclas
    let enlaces = document.querySelectorAll('a[href^="#"]');

    // Asigna el evento clic a cada enlace
    for (let i = 0; i < enlaces.length; i++) {
      enlaces[i].addEventListener('click', function(event) {
        // Previene el comportamiento predeterminado del enlace
        event.preventDefault();

        // Obtiene la posición del ancla en la página
        let ancla = this.getAttribute('href');
        let destino = document.querySelector(ancla);
        let posicion = destino.offsetTop;

        // Realiza el desplazamiento suave utilizando animaciones
        window.scrollTo({
          top: posicion,
          behavior: 'smooth'
        });
      });
    }
  });

