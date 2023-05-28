const formSueldo = document.querySelector('.sueldo');
let $hora = '';
let $valorHora = '';
let $desc = 0;
let $adi = 0;

//Variables para limitar el nro para agregar hrs extras
let contExtras = 0;
let limiteExtras = 7;
let lisExtras = [];

//Variables para contar las horas extras totales
let cont = 0;
let sumExtras = 0;
let contarHoras = {}
const extraEntradas = document.querySelector('.extra');

//Validacion de horas
formSueldo.hora.addEventListener('change', ev => {
    if (ev.target.value < 1 || ev.target.value > 1000) {
        ev.target.setCustomValidity("Ingrese una hora valida!")
    } else {
        $hora = parseFloat(ev.target.value);
        ev.target.setCustomValidity('')
    }
})

//Validacion de valor hora
formSueldo.valorHora.addEventListener('change', ev => {
    if (ev.target.value < 1 || ev.target.value > 2000) {
        ev.target.setCustomValidity("Ingrese un valor valido!")
    } else {
        $valorHora = parseInt(ev.target.value);
        ev.target.setCustomValidity('')
    }
})

//Validacion de descuento
formSueldo.descuento.addEventListener('change', ev => {

    if (ev.target.value < 1 || ev.target.value > 10000) {
        ev.target.setCustomValidity("Ingrese un valor valido!")
    } else {
        $desc = parseFloat(ev.target.value);
        ev.target.setCustomValidity('')
    }
})

//Validacion de adicional
formSueldo.adicional.addEventListener('change', ev => {

    if (ev.target.value < 1 || ev.target.value > 10000) {
        ev.target.setCustomValidity("Ingrese un valor valido!")
    } else {
        $adi = parseFloat(ev.target.value);

        ev.target.setCustomValidity('')
    }
})

//Calculamos el sueldo
formSueldo.addEventListener('submit', ev => {
    ev.preventDefault();
    ev.stopPropagation();

    if ($hora != '' && $valorHora != '') {
        let hrsExtras;
        let extras = 0;
        if (lisExtras != []) {
            hrsExtras = document.querySelectorAll('.vExtra label');
            hrsExtras.forEach(valor => {
                extras += parseInt(valor.innerText.slice(1));
                valor.parentNode.remove();
            })
            contExtras = 0;
        }

        const resultado = ($hora * $valorHora) - $desc + $adi + extras;
        const pSueldo = document.querySelector('#mostrarSueldo');
        Object.keys(contarHoras).forEach(function(key) {
            sumExtras += contarHoras[key];
        })
        sumExtras += $hora;
        console.log(sumExtras);
        if (formSueldo.hora.value != '' && formSueldo.valorHora.value != '') {
            const modal = document.querySelector('.calculin')
            modal.setAttribute('onclick', 'toggleModal(event)');
            modal.click();
        }

        const inputsExtra = document.querySelectorAll('.extra input');
        inputsExtra.forEach(valor => {
            valor.removeAttribute('style');
        })
        
        //Reseteamos los valores que necesitamos para un nuevo calculo
        cont = 0;
        sumExtras = 0;
        contarHoras = {}
        $desc = 0
        $adi = 0
        pSueldo.innerText = `$ ${resultado}`;
        ev.target.hora.value = '';
        ev.target.valorHora.value = '';
        ev.target.descuento.value = '';
        ev.target.adicional.value = '';
        document.querySelector('.msjeError').innerText = "";
    }
})

//Agregamos horas extras
const $agregar = document.querySelector('#agregar');
$agregar.addEventListener('click', ev => {
    ev.preventDefault();
    ev.stopPropagation();
    let prod = 1;
    const valores = document.querySelectorAll('.extra input')
    valores.forEach(ele => {
        if (ele.value < 1 || ele.value > 1500 || ele.value == '') {
            ele.style.borderColor = 'red';
            prod = 0;
        } else {
            prod *= parseInt(ele.value)
            ele.style.borderColor = "initial";
        }
    })

    if (prod != 0 && contExtras < limiteExtras) {
        const p = document.createElement('p');
        const label = document.createElement('label');
        const bEliminar = document.createElement('button');
        const span = document.createElement('span');
        bEliminar.classList.add(`button${cont}`);
        contarHoras[`button${cont}`] = parseInt(document.querySelector('.extra').firstChild.value);
        console.log(contarHoras);
        cont++;
        span.innerText = "$";
        label.appendChild(span);
        label.innerHTML += prod;
        label.setAttribute('readonly', 'true');
        bEliminar.innerText = "Eliminar";
        p.classList.add('vExtra');
        p.appendChild(label);
        p.appendChild(bEliminar);
        document.querySelector('.sueldo').insertBefore(p, document.querySelector('.extra'));
        contExtras++;
        valores.forEach(ele => {
            ele.value = '';
        })
        lisExtras = document.querySelectorAll('.vExtra button');
        valores[0].focus();

    }
})


//Si llegamos al limite deja de agregar horas extras
$agregar.addEventListener('click', ev => {
    ev.preventDefault();
    ev.stopPropagation();
    if (contExtras == limiteExtras) {
        const valores = document.querySelectorAll('.extra input')
        valores.forEach(ele => {
            ele.value = '';
            ele.style.borderColor = 'red';
        })
        document.querySelector('.msjeError').innerText = "No se puede agregar mas hrs extras!"
        ev.target.focus();

    }
})

//evento para eliminar horas extras
$agregar.addEventListener('click', ev => {
    ev.preventDefault();
    ev.stopPropagation();
    let inputValores;
    lisExtras.forEach(ele => {
        ele.addEventListener('click', eve => {
            eve.preventDefault();
            eve.stopPropagation();
            delete contarHoras[eve.target.className];
            console.log(contarHoras);
            eve.target.parentNode.remove();
            document.querySelector('.msjeError').innerText = "";
            contExtras = document.querySelectorAll('.vExtra button').length;
            inputValores = document.querySelectorAll('.extra input');
            inputValores.forEach(ele => {
                ele.style.borderColor = 'initial';

            })

        })
    })

})












