window.addEventListener("load", init, false);

function init(){
    cargarApiAnime();   
}


function cargarApiAnime(){
  const urlApiAnime = "https://kitsu.io/api/edge/anime?filter[seasonYear]=2020&filter[subtype]=TV&page[limit]=20&page[offset]=10&filter[streamers]=Crunchyroll"; 
  const urlApiAnimeAñadido = "https://kitsu.io/api/edge/anime?filter[seasonYear]=2020&filter[subtype]=TV&page[limit]=6&page[offset]=10&filter[streamers]=Crunchyroll"; 

  //para animes
  const fetchAnimes = fetch(urlApiAnime);
  
  fetchAnimes.then(respuesta => {

    return respuesta.json();

  }).then(resposte => {
    cargarAnimes(resposte.data);
  })

//para animes
const fetchAnimesAñadios = fetch(urlApiAnimeAñadido);
  
fetchAnimesAñadios.then(respuesta => {

  return respuesta.json();

}).then(resposte => {
  cargarUltimosAnimes(resposte.data);
})
  //para los Top anime
  const urlApiAnimeTop = "https://kitsu.io/api/edge/trending/anime?limit=15"; 
  const fetchAnimesTop = fetch(urlApiAnimeTop);
  
  fetchAnimesTop.then(respuesta => {

    return respuesta.json();

  }).then(resposte => {

    animesTop(resposte.data);
    
  })
}

function cargarAnimes(animes){

  cargarCarrousel(animes);
 
  cargarEpisodios(animes);

  

}

function cargarCarrousel(animes){

  animes.forEach(element => {

    let myCarrousel = document.querySelector(".carousel-inner");

    let divLista = document.createElement("div");
    let imgCarrousel = document.createElement("img");

    imgCarrousel.src = element.attributes.posterImage.large;
    imgCarrousel.alt = element.attributes.canonicalTitle;

  
    divLista.appendChild(imgCarrousel);
    divLista.classList.add("item")

    myCarrousel.appendChild(divLista);
    myCarrousel.firstElementChild.classList.add("active");

  });

}

function cargarUltimosAnimes(animes){
  animes.forEach(element => {
    let lista = document.querySelector("#aniAñadidos");
   // console.log(element);
    let divLista = document.createElement("div");
    let imgAnime = document.createElement("img");
    let nombreAnime = document.createElement("p")
    let linkAnime = document.createElement("a");
    
    nombreAnime.innerHTML = element.attributes.canonicalTitle;
    imgAnime.src = element.attributes.posterImage.small;

    linkAnime.href = "animesDesPage/detalles.html?"+element.id;

    divLista.appendChild(imgAnime);
    divLista.appendChild(nombreAnime);

    linkAnime.appendChild(divLista);
    
    lista.appendChild(linkAnime);
  });
}


function cargarEpisodios(animes){

  animes.forEach(element => {
    ponerUltimoEpisodio(element.attributes.canonicalTitle,element.relationships.episodes.links.related);
  });

}

function ponerUltimoEpisodio(nombreAnime,episodes){
  
  fetch(episodes).then(resultados =>{
    return resultados.json();
  }).then( episodios => {
    let ep = document.querySelector("#episodios");
    let lista = document.createElement("li");
    let link = document.createElement("a");
    
    link.innerHTML= nombreAnime+" "+ episodios.data.length;
    link.href="#home";
    lista.appendChild(link);
    ep.appendChild(lista);



  })

}

function animesTop(animes){
  animes.forEach(element => {
    let lista = document.querySelector("#lista");
   // console.log(element);
    let divLista = document.createElement("div");
    let imgAnime = document.createElement("img");
    let nombreAnime = document.createElement("p")
    let linkAnime = document.createElement("a");

    nombreAnime.innerHTML = element.attributes.canonicalTitle;
    imgAnime.src = element.attributes.posterImage.small;
    linkAnime.href = "animesDesPage/detalles.html?"+element.id;


    divLista.appendChild(imgAnime);
    divLista.appendChild(nombreAnime);
    linkAnime.appendChild(divLista);
    lista.appendChild(linkAnime);
  });
 
}

