const formSueldo = document.querySelector('.sueldo');
let $hora = '';
let $valorHora = '';
let $desc = 0;
let $adi = 0;
let contExtras = 0;
let lisExtras;
formSueldo.hora.addEventListener('blur', ev => {
    if (ev.target.value < 1 || ev.target.value > 1000) {
        ev.target.setCustomValidity("Ingrese una hora valida!")
    } else {
        $hora = parseFloat(ev.target.value);
        ev.target.setCustomValidity('')
    }
})

formSueldo.valorHora.addEventListener('blur', ev => {
    if (ev.target.value < 1 || ev.target.value > 2000) {
        ev.target.setCustomValidity("Ingrese un valor valido!")
    } else {
        $valorHora = parseInt(ev.target.value);
        ev.target.setCustomValidity('')
    }
})

formSueldo.descuento.addEventListener('blur', ev => {
    if (ev.target.value < 1 || ev.target.value > 10000) {
        ev.target.setCustomValidity("Ingrese un valor valido!")
    } else {
        $desc = parseFloat(ev.target.value);
        ev.target.setCustomValidity('')
    }
})
formSueldo.adicional.addEventListener('blur', ev => {
    if (ev.target.value < 1 || ev.target.value > 10000) {
        ev.target.setCustomValidity("Ingrese un valor valido!")
    } else {
        $adi = parseFloat(ev.target.value);
        ev.target.setCustomValidity('')
    }
})

formSueldo.addEventListener('submit', ev => {
    ev.preventDefault();
    ev.stopPropagation();
    console.log(typeof $hora)
    console.log($valorHora)
    console.log($desc)
    console.log($adi)
    if ($hora != '' && $valorHora != '') {
        const resultado = ($hora * $valorHora) - $desc + $adi;
        alert("Sueldo neto: $" + resultado);
        ev.target.hora.value = '';
        ev.target.valorHora.value = '';
        ev.target.descuento.value = '';
        ev.target.adicional.value = '';
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
            console.dir(ele)
            prod = 0;
            console.log('error');
            
        } else {
            prod *= parseInt(ele.value)
            ele.style.borderColor = "initial";

            console.log('bien')
        }
    })
        if(prod != 0 && contExtras < 7){
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
            contExtras ++;
            valores.forEach(ele => {
                ele.value = '';
            })
            lisExtras = document.querySelectorAll('vExtra');
        }
   


})


//Si llegamos al limita deja de agregar horas extras
$agregar.addEventListener('click', ev => {
    ev.preventDefault();
    ev.stopPropagation();
    if(contExtras == 7){
        const valores = document.querySelectorAll('.extra input')
        valores.forEach(ele => {
            ele.value = '';
        })
        document.querySelector('.msjeError').innerHTML = "No se puede agregar mas hrs extras!"
        lisExtras = document.querySelectorAll('vExtra');
    }
})










