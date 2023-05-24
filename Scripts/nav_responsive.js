let $menuToogle = document.querySelector('.menuToggle');
let $header = document.querySelector('header');
$header.addEventListener('click', ev =>{
    $header.classList.toggle('active');
})



const titulo =  document.querySelector('title');

document.querySelector('h1').innerText = titulo.innerText;