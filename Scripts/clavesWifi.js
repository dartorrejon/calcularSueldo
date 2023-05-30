const contraseñas = document.querySelector('#contraseñas');


const xhr = new XMLHttpRequest();

xhr.addEventListener('load', ev =>{
    if(ev.currentTarget.status === 200){
        let contenido = ev.currentTarget.responseText;
        let contenidoSeparado = contenido.split("\n")
        contenidoSeparado.sort();
        contenidoSeparado.forEach(element => {
            let datosWifi = element.split("-");
            let div = document.createElement('div');  
            let p = document.createElement('p');
            p.innerText = `Objetivo: ${datosWifi[0]}
            Red: ${datosWifi[1]}
            Contraseña: ${datosWifi[2]}`
            div.appendChild(p)
            contraseñas.appendChild(div);
        });
    }
    
})

xhr.open('GET',"./txt/claves.txt");
xhr.send();
