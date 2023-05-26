
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
  for (var clave in obj) {
    if (obj.hasOwnProperty(clave) && obj[clave] === valor) {
      return clave;
    }
  }
  return null; // Si no se encuentra el valor en ninguna clave
}


//Feriados - INCOMPLETO!!!!!!!
const feriados = {
  0: "Año Nuevo - 1 de enero (domingo)",
  1: "Carnaval - 27 y 28 de febrero (lunes y martes)",
  2: "Día Nacional de la Memoria por la Verdad y la Justicia - 24 de marzo (viernes)",
  3: "Viernes Santo - 7 de abril (viernes)",
  4: "Día del Veterano y de los Caídos en la Guerra de Malvinas - 2 de abril (domingo)",
  5: "Día del Trabajador - 1 de mayo (lunes)",
  6: "Día de la Revolución de Mayo - 25 de mayo (jueves)",
  7: "Paso a la Inmortalidad del General Manuel Belgrano - 20 de junio (martes)",
  8: "Día de la Independencia - 9 de julio (domingo)",
  9: "Paso a la Inmortalidad del General José de San Martín - 21 de agosto (lunes)",
  10: "Día del Respeto a la Diversidad Cultural - 16 de octubre (lunes)",
  11: "Día de la Soberanía Nacional - 20 de noviembre (lunes)",
  12: "Día de la Inmaculada Concepción - 8 de diciembre (viernes)",
  13: "Navidad - 25 de diciembre (lunes)"
}
//Funcion para cargar el Calendario 
const cargarCalencario = fecha => {
  const mes = fecha.getMonth();
  const año = fecha.getFullYear();
  const primerDiaSemana = new Date(año, mes, 1).getDay();

  const diaMes = cantDias(mes, año);

  const diaActual = fecha.getDate();
  const $calendario = document.querySelector('#calendar');
  $calendario.innerHTML = '';

  const $titulo = document.querySelector('h2');
  $titulo.innerText = `${meses[mes]} ${año}`

  //const $calendario = document.querySelector('#calendar');
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
  
  if (bDia != '' && bMes != '' && bAño != '') {
    bAño = parseInt(bAño);
    bMes = parseInt(bMes-1);
    bDia = parseInt(bDia);
    cargarCalencario(new Date(bAño, bMes, bDia))
    ev.target.buscaDia.value = '';
    ev.target.buscaMes.value = '';
    ev.target.buscaAño.value = '';
  }


})

//Revisar esta formula para ver si la fecha es valida
const validarFecha = (dia, mes, año) => {
  let dias31 = [01,03,05,07,08,10,12]
  let dias30 = [04,06,09,11]
  let bisiesto = false;

if ((año % 4 == 0 && año % 100 != 0) || año % 400 == 0){
    bisiesto = true
}
if(mes === 2 && bisiesto && dia <= 29){
  return true;
}else{
  return false;
}

if((dias31.find(ele => ele == mes)) && dia <=31){
  return true
}else {
  return false
}

if((dias30.find(ele => ele == mes)) && dia <=30){
  return true
}else {
  return false
}

}
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
