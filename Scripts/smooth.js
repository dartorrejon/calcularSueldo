  document.addEventListener('DOMContentLoaded', function() {
    try {
      let enlaces = document.querySelectorAll('a[href^="#"]');
    
      for (let i = 0; i < enlaces.length; i++) {
        enlaces[i].addEventListener('click', function(event) {
          try {
            event.preventDefault();
    
            let ancla = this.getAttribute('href');
            let destino = document.querySelector(ancla);
            let posicion = destino.offsetTop;
    
            window.scrollTo({
              top: posicion,
              behavior: 'smooth'
            });
          } catch (error) {
            console.error('Error:', error);
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  