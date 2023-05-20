const formSueldo = document.querySelector('.sueldo');
let $hora='';
let $valorHora = '';
let $desc = '';
let $adi = '';
formSueldo.hora.addEventListener('blur', ev =>{
    if(ev.target.value <1 || ev.target.value > 1000){
        ev.target.setCustomValidity("Ingrese una hora valida!")
    }else{
        $hora = parseFloat(ev.target.value);
        ev.target.setCustomValidity('')
    }
})

formSueldo.valorHora.addEventListener('blur', ev =>{
    if(ev.target.value <1 || ev.target.value > 2000){
        ev.target.setCustomValidity("Ingrese un valor valido!")
    }else{
        $valorHora = parseInt(ev.target.value);
        ev.target.setCustomValidity('')
    }
})

formSueldo.descuento.addEventListener('blur', ev =>{
    if(ev.target.value <1 || ev.target.value > 10000){
        ev.target.setCustomValidity("Ingrese un valor valido!")
    }else{
        $desc = parseFloat(ev.target.value);
        ev.target.setCustomValidity('')
    }
})
formSueldo.adicional.addEventListener('blur', ev =>{
    if(ev.target.value <1 || ev.target.value > 10000){
        ev.target.setCustomValidity("Ingrese un valor valido!")
    }else{
        $adi = parseFloat(ev.target.value);
        ev.target.setCustomValidity('')
    }
})

formSueldo.addEventListener('submit', ev =>{
    ev.preventDefault();
    ev.stopPropagation();
    console.log(typeof $hora)
    console.log($valorHora)
    console.log($desc)
    console.log($adi)
    if($hora != '' && $valorHora != '' && $desc != '' && $adi != ''){
        const resultado = ($hora*$valorHora) -$desc+$adi;
        console.log(resultado);
        ev.target.hora.value ='';
        ev.target.valorHora.value = '';
        ev.target.descuento.value = '';
        ev.target.adicional.value = '';
    }
})

// formSueldo.hora.addEventListener('blur', ev =>{
//     if(ev.target.value <1 || ev.target.value > 1000){
//         ev.target.setCustomValidity("Ingrese una hora valida!")
//     }
// })