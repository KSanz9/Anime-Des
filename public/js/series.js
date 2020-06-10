window.addEventListener("load", init, false);

let numeroAnime = 4835;
let numeroLista = 1;

function init(){
  cargarApiAnime(numeroAnime);
  document.getElementById("next").addEventListener("click", cambiarAnimesNext);  
  document.getElementById("prev").addEventListener("click", cambiarAnimesPrev);  
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

    let linkAnime = document.createElement("a");
    nombreAnime.innerHTML = element.attributes.canonicalTitle;     
    imgAnime.src = element.attributes.posterImage.small;
    imgAnime.alt = element.attributes.canonicalTitle;
    linkAnime.href = "./detalles.html?"+element.id;


    divAnime.appendChild(imgAnime);
    divAnime.appendChild(nombreAnime);
    linkAnime.appendChild(divAnime);
    divPrincipal.appendChild(linkAnime);


  });
  

}

function cambiarAnimesNext(ev){
  document.querySelector("#animes").innerHTML="";
  numeroAnime -= 15;
  numeroLista += 1
  document.querySelector("#numeroLista").innerHTML = numeroLista;
  cargarApiAnime(numeroAnime);

}
function cambiarAnimesPrev(ev){

  document.querySelector("#animes").innerHTML="";
  numeroAnime += 15;
  numeroLista -= 1
  document.querySelector("#numeroLista").innerHTML = numeroLista;
  cargarApiAnime(numeroAnime);

}