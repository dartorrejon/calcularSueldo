let objetivos = document.querySelector('#objetivos');
fetch("/data/objetivos.json")
.then(res => res.json())
.then(json =>{
    json.forEach(element => {
    let divCard = document.createElement('div')
    let titleCard = document.createElement('h5')
    let contImgCard = document.createElement('div');
    let imgCard = document.createElement('img')
    let contentCard = document.createElement('p')    
    divCard.className = 'objetivo container'
    contImgCard.className = 'imgContainer'
    imgCard.className = 'fotoObjetivo'
    titleCard.innerText = element.titulo;
    imgCard.src = element.src
    imgCard.alt = element.alt
    contImgCard.appendChild(imgCard)
    contentCard.innerText = `Direccion: ${element.direccion}
    Estufa: ${element.estufa}
    Ventilador: ${element.ventilador}
    Estado de la Silla: ${element.estadoSilla}
    Baño: ${element.baño}
    Wifi: ${element.wifi}
    Fecha de Actualizacion: ${element.fechaActualizacion}`
    divCard.appendChild(titleCard)
    divCard.appendChild(contImgCard);
    divCard.appendChild(contentCard);
    objetivos.appendChild(divCard);
    });
} )

//Implementamos un buscador
document.addEventListener('keyup', ev =>{
    if(ev.target.matches('#search')){
        document.querySelectorAll('.objetivo > h5').forEach(objetivo =>{
            objetivo.textContent.toLowerCase().includes(ev.target.value.toLowerCase())
            ?objetivo.parentNode.classList.remove('filtro')
            :objetivo.parentNode.classList.add('filtro');            
        })
    }
})
