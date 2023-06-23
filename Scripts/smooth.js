document.addEventListener('DOMContentLoaded', function () {
  try {
    let enlaces = document.querySelectorAll('a[href^="#"]'); //Selecciona todos los elementos que comienzan con "#" (anclas)
    for (let i = 0; i < enlaces.length; i++) {
      enlaces[i].addEventListener('click', function (event) {
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

//Dandole un delay al link de mercado pago
let mercado = document.querySelector('.mercadopago a');
mercado.addEventListener('click', ev =>{
  setTimeout( () => {
    window.location.href = event.target.href;
  },1000);
})
