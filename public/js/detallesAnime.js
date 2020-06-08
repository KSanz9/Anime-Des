
window.addEventListener("load", init, false);


function init(){
    /*recoge la id del anime para saber cual has mirado */
    let idAnime = window.location.href.split("?")[1];
    cargarApiAnime(idAnime);
  
   
  }

  function cargarApiAnime(idAnime) {
    //atributos principales
    const urlApiAnime = "https://kitsu.io/api/edge/anime?filter[id]="+idAnime;
    const fetchAnimes = fetch(urlApiAnime);
    
    fetchAnimes.then(respuesta => {
  
      return respuesta.json();
  
    }).then(result => {   
      infoAnimeAtributos(result.data[0]);
     })
  }

  function infoAnimeAtributos(anime){
    console.log(anime);
    let imgAnime = document.createElement("img");
    let nombreAnime = document.createElement("h1");
    let synopsisAnime = document.createElement("p");
    let statusAnime = document.createElement("h3");
    let typeAnime = document.createElement("h3");
    

    imgAnime.src = anime.attributes.posterImage.small;
    imgAnime.alt = anime.attributes.canonicalTitle;
    imgAnime.classList.add("imgAnimeDetails");

    nombreAnime.innerHTML = anime.attributes.canonicalTitle;
    nombreAnime.classList.add("nameAnimeDetails");

    synopsisAnime.innerHTML = anime.attributes.synopsis;
    synopsisAnime.classList.add("synopsisAnimeDetails");

    statusAnime.innerHTML = anime.attributes.status;
    statusAnime.classList.add("statusAnimeDetails");

    typeAnime.innerHTML = anime.attributes.subtype;
    typeAnime.classList.add("typeAnimeDetails");


    añandirElementos(imgAnime, nombreAnime, synopsisAnime, statusAnime, typeAnime);

  }


  function añandirElementos(imgAnime, nombreAnime, synopsisAnime, statusAnime, typeAnime){
    let divPrincipal = document.getElementById("anime");

    divPrincipal.appendChild(imgAnime);
    divPrincipal.appendChild(nombreAnime);
    divPrincipal.appendChild(synopsisAnime);
    divPrincipal.appendChild(statusAnime);
    divPrincipal.appendChild(typeAnime);


  }