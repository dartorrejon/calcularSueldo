const año = new Date().getFullYear();
const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];
let tituloFeriados = document.querySelector('title');
tituloFeriados.innerText = `Feriados ${año}` //agregamos el año actual al titulo

const feriados = fetch(`https://nolaborables.com.ar/api/v2/feriados/${año}`);

    feriados
    .then(res => res.json())
    .then(data => {
        const ul = document.createElement('ul');
        //Obtenemos toda la informacion de los feriados recorriendolo con un forEach
        Object.keys(data).forEach(function (diaFeriado) {
            const feriado = data[diaFeriado];
            const li = document.createElement('li');
            li.innerText += `${feriado.dia} de ${nombresMeses[(feriado.mes - 1)]} : ${feriado.motivo} (${feriado.tipo})`;
            ul.appendChild(li);
        })
        document.querySelector('#contenedor-feriados').appendChild(ul);
    })