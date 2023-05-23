const formSueldo = document.querySelector('.sueldo');
let $hora = '';
let $valorHora = '';
let $desc = 0;
let $adi = 0;
let contExtras = 0;
let limiteExtras = 3;
let lisExtras=[];
const extraEntradas = document.querySelector('.extra');

//Validacion de horas
formSueldo.hora.addEventListener('blur', ev => {
    if (ev.target.value < 1 || ev.target.value > 1000) {
        ev.target.setCustomValidity("Ingrese una hora valida!")
    } else {
        $hora = parseFloat(ev.target.value);
        ev.target.setCustomValidity('')
    }
})

//Validacion de valor hora
formSueldo.valorHora.addEventListener('blur', ev => {
    if (ev.target.value < 1 || ev.target.value > 2000) {
        ev.target.setCustomValidity("Ingrese un valor valido!")
    } else {
        $valorHora = parseInt(ev.target.value);
        ev.target.setCustomValidity('')
    }
})

//Validacion de descuento
formSueldo.descuento.addEventListener('blur', ev => {
    if (ev.target.value < 1 || ev.target.value > 10000) {
        ev.target.setCustomValidity("Ingrese un valor valido!")
    } else {
        $desc = parseFloat(ev.target.value);
        ev.target.setCustomValidity('')
    }
})

//Validacion de adicional
formSueldo.adicional.addEventListener('blur', ev => {
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
        if(lisExtras != []){
            hrsExtras = document.querySelectorAll('.vExtra label');
            hrsExtras.forEach(valor => {
                extras +=parseInt(valor.innerText);
                valor.parentNode.remove();
            })
            contExtras=0;
        }
        const resultado = ($hora * $valorHora) - $desc + $adi + extras;
        const pSueldo = document.querySelector('#mostrarSueldo');
        if(formSueldo.hora.value != '' && formSueldo.valorHora.value != '') {
            
            const modal = document.querySelector('.calculin')
            modal.setAttribute('onclick', 'toggleModal(event)');
            modal.click();
        }
        

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
        if(prod != 0 && contExtras < limiteExtras){
            const p = document.createElement('p');
            const label = document.createElement('label');
            const bEliminar = document.createElement('button');
            label.innerText = prod;
            label.setAttribute('readonly', 'true');
            bEliminar.innerText = "Eliminar";
            p.classList.add('vExtra');
            p.appendChild(label);
            p.appendChild(bEliminar);
            document.querySelector('.sueldo').insertBefore(p,document.querySelector('.extra'));
            contExtras++;
            valores.forEach(ele => {
                ele.value = '';
            })
            lisExtras = document.querySelectorAll('.vExtra button');
        }
   


})


//Si llegamos al limite deja de agregar horas extras
$agregar.addEventListener('click', ev => {
    ev.preventDefault();
    ev.stopPropagation();
    if(contExtras == limiteExtras){
        const valores = document.querySelectorAll('.extra input')
        valores.forEach(ele => {
            ele.value = '';
        })
        document.querySelector('.msjeError').innerText = "No se puede agregar mas hrs extras!"
        
    }
})

//evento para eliminar horas extras
$agregar.addEventListener('click', ev => {
    ev.preventDefault();
    ev.stopPropagation();
    lisExtras.forEach(ele => {
        ele.addEventListener('click', eve => {
            eve.preventDefault();
            eve.stopPropagation();
            eve.target.parentNode.remove();
            document.querySelector('.msjeError').innerText = "";
            contExtras = document.querySelectorAll('.vExtra button').length;
            
        })
    })
   
})












