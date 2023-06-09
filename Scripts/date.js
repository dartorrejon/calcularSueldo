const cantDias = (mes, año) => {
  const fecha = new Date(año, mes + 1, 1);
  fecha.setDate(0);
  return fecha.getDate();
}

const fechaActual = new Date(); //Fecha actual
let bAño = ''
let bMes = ''
let bDia = ''

// Objeto meses
const meses = {
  0: "Enero",
  1: "Febrero",
  2: "Marzo",
  3: "Abril",
  4: "Mayo",
  5: "Junio",
  6: "Julio",
  7: "Agosto",
  8: "Sepiembre",
  9: "Octubre",
  10: "Noviembre",
  11: "Diciembre"
}

//Es clave!!
const obtenerClave = (obj, valor) => {
  for (let clave in obj) {
    if (obj.hasOwnProperty(clave) && obj[clave] === valor) {
      return clave;
    }
  }
  return null; // Si no se encuentra el valor en ninguna clave
}

//Funcion para validar fecha ingresada
const validarFecha = (dia, mes, año) => {
  let dias31 = [01, 03, 05, 07, 08, 10, 12]
  let dias30 = [04, 06, 09, 11]
  let bisiesto = false;

  //Comprueba año bisiesto
  if ((año % 4 == 0 && año % 100 != 0) || año % 400 == 0) {
    bisiesto = true
  }

  if ((dias31.find(ele => ele == mes)) && dia <= 31) {
    return true
  } else if ((dias30.find(ele => ele == mes)) && dia <= 30) {
    return true
  } else if ((mes === 2 && bisiesto && dia <= 29) || (mes === 2 && !bisiesto && dia <= 28)) {
    return true;
  } else {
    return false;
  }
}

//Funcion para cargar el Calendario 
const cargarCalencario = fecha => {
  const mes = fecha.getMonth();
  const año = fecha.getFullYear();
  const primerDiaSemana = new Date(año, mes, 1).getDay();
  const infoFeriados = []
  const diaMes = cantDias(mes, año);
  let $feriados;

  const diaActual = fecha.getDate();
  const $calendario = document.querySelector('#calendar');
  $calendario.innerHTML = '';

  const $titulo = document.querySelector('h2');
  $titulo.innerText = `${meses[mes]} ${año}`
 

  for (let i = 1; i <= diaMes; i++) {
    const d = document.createElement('li');
    d.innerText = i;
    if (i === 1) {
      d.style.gridColumnStart = primerDiaSemana + 1;
      d.setAttribute('id', 'primerDia');
    }
    if (i === diaActual) {
      d.style.color = 'red';
      d.style.fontWeight = 'bold'
    }
    $calendario.appendChild(d);
  }
  //Utilizamos la API REST de feriados para mostrarlos en el Calendar  
  fetch(`https://nolaborables.com.ar/api/v2/feriados/${año}?formato=mensual`)
    .then(res => res.json())
    .then(data => {
      let todosDias = document.querySelectorAll('#calendar li');
       $feriados = document.querySelector('.feriadosDescripcion');
      $feriados.innerHTML = '';

      let dfer = data[mes]
      Object.keys(dfer).forEach(key => {
        let motivos = dfer[key]
        const fechaFeri ={}
        fechaFeri["dia"] = parseInt(key);
        fechaFeri["motivo"] = `${motivos.motivo}`;
        fechaFeri["tipo"] = `${motivos.tipo}`;
       infoFeriados.push(fechaFeri)
      })
      
      for (const key in todosDias) {
        if (Object.hasOwnProperty.call(todosDias, key)) {
          const element = todosDias[key];
          for(i = 0; i < infoFeriados.length; i++) {
            if(element.innerText == infoFeriados[i].dia){
              element.style.color = "green";
              element.style.fontWeight = "bold";
              const p = document.createElement("p");
              p.classList = "feriadoInfo";
              p.innerText = `${infoFeriados[i].dia}: ${infoFeriados[i].motivo} (${infoFeriados[i].tipo}) `;
              $feriados.appendChild(p);
              
              if (parseInt(element.innerText) === diaActual) {
               element.style.color = 'red';
              }
            }
          }
        }
      }
    }).catch(err =>{
      console.warn(err.message);
      $feriados.innerHTML = ''
    })
}

//Cargamos el calendario con la fecha actual cuando abrimos el navegador
window.addEventListener('load', ev => {
  cargarCalencario(fechaActual)
})

const formBuscar = document.querySelector('.buscarFecha');

formBuscar.buscaDia.addEventListener("blur", ev => {

  if (ev.target.value < 1 || ev.target.value > 31) {
    ev.target.setCustomValidity("Dia invalido!");
  } else {
    ev.target.setCustomValidity('');
    bDia = ev.target.value;
  }
})

formBuscar.buscaMes.addEventListener("blur", ev => {

  if (ev.target.value < 1 || ev.target.value > 12) {
    ev.target.setCustomValidity("Mes invalido!");
  } else {
    ev.target.setCustomValidity('');
    bMes = ev.target.value;
  }
})

formBuscar.buscaAño.addEventListener("blur", ev => {

  if (ev.target.value < 1901 || ev.target.value > 3000) {
    ev.target.setCustomValidity("Año invalido!");
  } else {
    ev.target.setCustomValidity('');
    bAño = ev.target.value;
  }
})

formBuscar.addEventListener("submit", ev => {
  ev.preventDefault();
  ev.stopPropagation();
  let msjeFechaError = document.querySelector("#fechaError");
  msjeFechaError.style.color = "red";

  if (bDia != '' && bMes != '' && bAño != '') {
    bAño = parseInt(bAño);
    bMes = parseInt(bMes - 1);
    bDia = parseInt(bDia);

    if (validarFecha(bDia, bMes + 1, bAño)) {
      cargarCalencario(new Date(bAño, bMes, bDia))
    } else {
      msjeFechaError.classList.toggle("oculto");
    }

    if (msjeFechaError.className == "") {
      setTimeout(() => {
        msjeFechaError.classList.toggle("oculto");
      }, 1200);
    }
    ev.target.buscaDia.value = '';
    ev.target.buscaMes.value = '';
    ev.target.buscaAño.value = '';
  }


})

//Evento para el boton año atras
document.querySelector("#año-atras").addEventListener("click", ev => {
  ev.preventDefault();
  ev.stopPropagation();
  const ano = document.querySelector('h2').innerText.split(' ');
  const año = parseInt(ano[1]) - 1
  const mes = parseInt(obtenerClave(meses, ano[0]))
  cargarCalencario(new Date(año, mes, 1))
})

//Evento para el boton año adelante
document.querySelector("#año-adelante").addEventListener("click", ev => {
  ev.preventDefault();
  ev.stopPropagation();
  const ano = document.querySelector('h2').innerText.split(' ');
  const año = parseInt(ano[1]) + 1
  const mes = parseInt(obtenerClave(meses, ano[0]))
  cargarCalencario(new Date(año, mes, 1))
})

//Evento para el boton mes atras
document.querySelector("#mes-atras").addEventListener("click", ev => {
  ev.preventDefault();
  ev.stopPropagation();
  const ano = document.querySelector('h2').innerText.split(' ');
  const clave = parseInt(obtenerClave(meses, ano[0])) - 1
  cargarCalencario(new Date(ano[1], clave, 1))
})

//Evento para el boton mes adelante
document.querySelector("#mes-adelante").addEventListener("click", ev => {
  ev.preventDefault();
  ev.stopPropagation();
  const ano = document.querySelector('h2').innerText.split(' ');
  const clave = parseInt(obtenerClave(meses, ano[0])) + 1
  cargarCalencario(new Date(ano[1], clave, 1))
})

//Evento para el boton HOY
document.querySelector('#hoy').addEventListener('click', ev => {
  ev.preventDefault();
  ev.stopPropagation();
  cargarCalencario(new Date());
})

