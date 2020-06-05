window.onload=init;
let numeroAnime = 4835;
let numeroLista = 1;
function init(){
  cargarApiAnime(numeroAnime);
  document.getElementById("next").addEventListener("click", cambiarAnimesNext);  
}


function cargarApiAnime(numero){
    const urlApiAnime = "https://kitsu.io/api/edge/anime?filter[subtype]=TV&page[limit]=15&page[offset]="+numero;
    const fetchAnimes = fetch(urlApiAnime);
    
    fetchAnimes.then(respuesta => {
  
      return respuesta.json();
  
    }).then(resposte => {
      seriesAnime(resposte.data);
    })
  }


function seriesAnime(animes){

  animes.forEach(element => {
    
    let nombreAnime = document.createElement("p");
    let imgAnime = document.createElement("img");
    let divAnime = document.createElement("div");
    let divPrincipal = document.querySelector("#animes");

    nombreAnime.innerHTML = element.attributes.canonicalTitle;     
    imgAnime.src = element.attributes.posterImage.small;
    imgAnime.alt = element.attributes.canonicalTitle;
    divAnime.appendChild(imgAnime);
    divAnime.appendChild(nombreAnime);
    divPrincipal.appendChild(divAnime);

  });
  

}

function cambiarAnimesNext(ev){

  document.querySelector("#animes").innerHTML="";
  numeroAnime -= 15;
  numeroLista += 1
  document.querySelector("#numeroLista").innerHTML = numeroLista;
  cargarApiAnime(numeroAnime-15);

}